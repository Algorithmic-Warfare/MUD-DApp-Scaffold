import type { WorldInput } from '@latticexyz/world';
import { defineWorld } from '@latticexyz/world';
import {
  CONFIG_DEFAULTS,
  DEPLOY_DEFAULTS,
  CODEGEN_DEFAULTS,
  SYSTEM_DEFAULTS,
  SystemsInput,
  NamespacesInput,
  ModuleInput,
  DeployInput,
  CodegenInput,
  SystemInput,
} from "@latticexyz/world/internal";
import { StoreInput } from "@latticexyz/store";

type ResolvedWorld = ReturnType<typeof defineWorld>;

type TableInput = Record<string, any>; // Allow string indexing for now
type ResolvedNamespace = Record<string, any>; // Allow string indexing for now

type NamespaceReversal = {
  namespace?: string;
  namespaces?: NamespacesInput;
  tables?: StoreInput["tables"];
  systems?: SystemsInput;
};

type SystemReversal = {
  systems?: SystemsInput;
  excludeSystems?: readonly string[];
};

// Helper to check if a value is the default
const isDefault = (value: any, defaultValue: any) => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return JSON.stringify(value) === JSON.stringify(defaultValue);
  }
  return value === defaultValue;
};

function reverseSystems(
  resolvedSystems: ReturnType<typeof defineWorld>['systems'],
  context: { namespace?: string; globalExcludeSystems?: readonly string[] }
): SystemReversal {
  const systemsInput: SystemsInput = {};
  const excludeSystems: string[] = [];

  for (const systemLabel in resolvedSystems) {
    const system = (resolvedSystems as Record<string, any>)[systemLabel]; // Cast for indexing
    const reversedSystem: Partial<SystemInput> = {};

    // Omit default values
    if (!isDefault(system.openAccess, SYSTEM_DEFAULTS.openAccess)) {
      reversedSystem.openAccess = system.openAccess;
    }
    if (!isDefault(system.accessList, SYSTEM_DEFAULTS.accessList)) {
      reversedSystem.accessList = [...system.accessList];
    }

    // Revert deploy config to original format
    if (system.deploy && !isDefault(system.deploy, DEPLOY_DEFAULTS)) {
      reversedSystem.deploy = { ...system.deploy };
    }

    // Only include properties that are not default or are explicitly set
    if (Object.keys(reversedSystem).length > 0) {
      (systemsInput as any)[systemLabel] = reversedSystem; // Cast to any for assignment
    }
  }

  // Handle global exclude systems only for the root context
  // Assumption: globalExcludeSystems is passed in context when reversing the root world.
  if (!context.namespace && context.globalExcludeSystems) {
    excludeSystems.push(...context.globalExcludeSystems);
  }

  return {
    systems: Object.keys(systemsInput).length > 0 ? systemsInput : undefined,
    excludeSystems: excludeSystems.length > 0 ? excludeSystems : undefined,
  };
}

function reverseNamespaces(resolvedNamespaces: ReturnType<typeof defineWorld>["namespaces"]): NamespaceReversal {
  const namespaceLabels = Object.keys(resolvedNamespaces);

  const reverseTables = (tables: ResolvedNamespace["tables"]): StoreInput["tables"] => {
    const reversedTables: Record<string, Partial<TableInput>> = {};
    for (const tableName in tables as Record<string, TableInput>) {
      // Explicitly cast to allow string indexing
      const table = (tables as Record<string, TableInput>)[tableName];
      const reversedTable: Partial<TableInput> = {};

      if (Object.keys(table.schema).length > 0) {
        reversedTable.schema = table.schema;
      }
      if (Object.keys(table.keySchema).length > 0) {
        reversedTable.keySchema = table.keySchema;
      }
      if (table.name !== tableName) {
        reversedTable.name = table.name;
      }
      if (table.tableId !== `${table.namespace}:${table.name}`) {
        reversedTable.tableId = table.tableId;
      }
      if (table.type !== "table") {
        reversedTable.type = table.type;
      }
      if (table.namespace !== "") {
        reversedTable.namespace = table.namespace;
      }
      if (table.primaryKeys && Object.keys(table.primaryKeys).length > 0) {
        reversedTable.primaryKeys = table.primaryKeys;
      }
      if (table.tableId !== `${table.namespace}:${table.name}`) {
        reversedTable.tableId = table.tableId;
      }

      if (Object.keys(reversedTable).length > 0) {
        reversedTables[tableName] = reversedTable;
      }
    }
    return reversedTables as StoreInput["tables"];
  };

  if (namespaceLabels.length === 1) {
    const defaultNamespaceLabel = "";
    const namespace = (resolvedNamespaces as Record<string, ResolvedNamespace>)[namespaceLabels[0]];

    if (namespace.label === defaultNamespaceLabel) {
      const reversedRoot: NamespaceReversal = {};
      const reversedTables = reverseTables(namespace.tables);
      if (reversedTables && Object.keys(reversedTables).length > 0) {
        reversedRoot.tables = reversedTables;
      }
      const reversedSystemsResult = reverseSystems(namespace.systems, { namespace: namespace.label });
      if (reversedSystemsResult.systems && Object.keys(reversedSystemsResult.systems).length > 0) {
        reversedRoot.systems = reversedSystemsResult.systems;
      }
      return reversedRoot;
    } else {
      const reversedSingleNamespace: NamespaceReversal = {
        namespace: namespace.label,
      };
      const reversedTables = reverseTables(namespace.tables);
      if (reversedTables && Object.keys(reversedTables).length > 0) {
        reversedSingleNamespace.tables = reversedTables;
      }
      const reversedSystemsResult = reverseSystems(namespace.systems, { namespace: namespace.label });
      if (reversedSystemsResult.systems && Object.keys(reversedSystemsResult.systems).length > 0) {
        reversedSingleNamespace.systems = reversedSystemsResult.systems;
      }
      return reversedSingleNamespace;
    }
  } else {
    const reversedNamespacesInput: NamespacesInput = {};
    for (const label in resolvedNamespaces as Record<string, ResolvedNamespace>) {
      // Explicitly cast to allow string indexing
      const namespace = (resolvedNamespaces as Record<string, ResolvedNamespace>)[label];
      const reversedNamespace: Partial<NamespacesInput[string]> = {};

      const reversedTables = reverseTables(namespace.tables);
      if (reversedTables && Object.keys(reversedTables).length > 0) {
        (reversedNamespace as any).tables = reversedTables;
      }

      const reversedNamespaceSystemsResult = reverseSystems(namespace.systems, { namespace: label });
      if (reversedNamespaceSystemsResult.systems && Object.keys(reversedNamespaceSystemsResult.systems).length > 0) {
        (reversedNamespace as any).systems = reversedNamespaceSystemsResult.systems;
      }

      if (Object.keys(reversedNamespace).length > 0) {
        (reversedNamespacesInput as any)[label] = reversedNamespace as Omit<NamespacesInput[string], "label">;
      }
    }
    return { namespaces: reversedNamespacesInput };
  }
}

// Simple value reversers
function reverseModules(modules: ResolvedWorld['modules']) {
  return modules.map((module: any) => { // Cast module to any here
    const reversedModule: Partial<ModuleInput> = {};
    if ('artifactPath' in module && module.artifactPath) {
      reversedModule.artifactPath = module.artifactPath;
    } else if ('name' in module && module.name) {
      reversedModule.name = module.name;
    }
    if (module.args && module.args.length > 0) {
      reversedModule.args = module.args;
    }
    return reversedModule;
  }).filter(m => Object.keys(m).length > 0) as ModuleInput[];
}

function reverseDeploy(deploy: ResolvedWorld['deploy']) {
  return Object.fromEntries(
    Object.entries(deploy)
      .filter(([key, value]) => value !== (DEPLOY_DEFAULTS as any)[key])
  ) as Partial<DeployInput>;
}

function reverseCodegen(codegen: ResolvedWorld['codegen']) {
  return Object.fromEntries(
    Object.entries(codegen)
      .filter(([key, value]) => value !== (CODEGEN_DEFAULTS as any)[key])
  ) as Partial<CodegenInput>;
}

/**
 * Reconstructs original WorldInput from resolved defineWorld output
 * @param resolvedWorld The configured world from defineWorld
 * @returns WorldInput matching original configuration structure with defaults removed
 */
export function reverseWorld(resolvedWorld: ReturnType<typeof defineWorld>): WorldInput {
  // 1. Reverse namespaces
  const namespaceResult = reverseNamespaces(resolvedWorld.namespaces);
  
  // 2. Reverse systems with namespace context
  const systemResult = reverseSystems(resolvedWorld.systems, {
    namespace: resolvedWorld.multipleNamespaces ? undefined : resolvedWorld.namespace
  });

  // 3. Reverse modules
  const reversedModules = reverseModules(resolvedWorld.modules);

  // 4. Reverse deploy/config
  const reversedDeploy = reverseDeploy(resolvedWorld.deploy);
  const reversedCodegen = reverseCodegen(resolvedWorld.codegen);

  // 5. Combine results
  return {
    ...namespaceResult,
    ...systemResult,
    modules: reversedModules,
    deploy: reversedDeploy,
    codegen: reversedCodegen,
    // Handle tables from namespace reversal
    tables: namespaceResult.tables || {}
  };
}
