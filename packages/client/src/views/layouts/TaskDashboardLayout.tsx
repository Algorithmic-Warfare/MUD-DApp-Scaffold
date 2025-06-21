import React, { useState, useEffect } from "react";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";
import { Textarea } from "src/components/ui/Textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "src/components/ui/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "src/components/ui/Dialog";
import { Badge } from "src/components/ui/Badge";
import { useMUD } from "src/providers/mud";

export function TaskDashboardLayout() {
  const {
    systemCalls,
    sync: { isSyncing },
  } = useMUD();
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({
    assignee: "",
    description: "",
    deadline: "",
  });
  const [editTask, setEditTask] = useState({
    id: BigInt(0),
    assignee: "",
    description: "",
    deadline: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    refreshTasks();
  }, [isSyncing]);

  const refreshTasks = () => {
    const allTasks = systemCalls.getAllTasks();
    setTasks(allTasks);
  };


  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await systemCalls.createTask(
      newTask.assignee,
      newTask.description,
      BigInt(new Date(newTask.deadline).getTime())
    );
    setNewTask({ assignee: "", description: "", deadline: "" });
    refreshTasks();
  };

  const handleEditTask = async () => {
    await systemCalls.updateTaskDescription(editTask.id, editTask.description);
    await systemCalls.updateTaskAssignee(editTask.id, editTask.assignee);
    await systemCalls.updateTaskDeadline(
      editTask.id,
      BigInt(new Date(editTask.deadline).getTime())
    );
    setDialogOpen(false);
    refreshTasks();
  };

  const handleCompleteTask = async (taskId: bigint) => {
    await systemCalls.completeTask(taskId);
    refreshTasks();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>

      <form onSubmit={handleCreateTask} className="mb-8 space-y-4">
        <div className="space-y-2">
          <label className="block">Assignee</label>
          <Input
            value={newTask.assignee}
            onChange={(e) =>
              setNewTask({ ...newTask, assignee: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block">Description</label>
          <Textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block">Deadline</label>
          <Input
            type="datetime-local"
            value={newTask.deadline}
            onChange={(e) =>
              setNewTask({ ...newTask, deadline: e.target.value })
            }
            required
          />
        </div>

        <Button type="submit">Create Task</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.fields.id.toString()}>
              <TableCell>{task.fields.id.toString()}</TableCell>
              <TableCell>{task.fields.creator}</TableCell>
              <TableCell>{task.fields.assignee}</TableCell>
              <TableCell>{task.fields.description}</TableCell>
              <TableCell>
                {new Date(Number(task.fields.deadline)).toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={task.fields.status === 1 ? "default" : "destructive"}
                >
                  {task.fields.status === 1 ? "Completed" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditTask({
                      id: task.fields.id,
                      assignee: task.fields.assignee,
                      description: task.fields.description,
                      deadline: new Date(Number(task.fields.deadline))
                        .toISOString()
                        .slice(0, 16),
                    });
                    setDialogOpen(true);
                  }}
                  disabled={task.fields.status === 1}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleCompleteTask(task.fields.id)}
                  disabled={task.fields.status === 1}
                >
                  Complete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update the task details below</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block">Assignee</label>
              <Input
                value={editTask.assignee}
                onChange={(e) =>
                  setEditTask({ ...editTask, assignee: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block">Description</label>
              <Textarea
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block">Deadline</label>
              <Input
                type="datetime-local"
                value={editTask.deadline}
                onChange={(e) =>
                  setEditTask({ ...editTask, deadline: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditTask}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskDashboardLayout;
