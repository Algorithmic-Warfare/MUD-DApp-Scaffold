# HOW TO ISSUE

## **Builder Tester Call: How to Report an Issue**

Effective issue reporting is crucial for rapid iteration and improvement of the scaffold. This guide provides a structured approach to ensure your feedback is clear, actionable, and helps us quickly understand and address problems.

### **Where to Report?**

All issues and feedback should be reported in the **special group chat** created for the Builder Tester Call.

### **General Guidelines for Reporting**

1. **Be Specific:** Vague reports are hard to act on. Provide as much detail as possible.  
2. **One Issue Per Report (if possible):** If you find multiple distinct issues, consider reporting them separately for clarity, or clearly delineate them within a single message.  
3. **Search Before Reporting:** Quickly check if someone else has already reported the same issue to avoid duplication. If so, add your observations to the existing discussion.

### **Structure of an Issue Report**

Please try to include the following information in your reports:

#### **1\. Issue Type (e.g., \[BUG\], \[FEATURE REQUEST\], \[IMPROVEMENT\], \[QUESTION\])**

* **\[BUG\]**: Something is not working as expected, causing an error, or crashing.  
* **\[FEATURE REQUEST\]**: Suggestion for a new capability or missing functionality.  
* **\[IMPROVEMENT\]**: Suggestion to enhance an existing feature or aspect of the scaffold (e.g., performance, usability).  
* **\[QUESTION\]**: When you need clarification or guidance on how to use a specific part of the scaffold.

#### **2\. Clear Title/Summary**

A concise, descriptive summary of the issue.

* *Bad:* "It broke."  
* *Good:* "\[BUG\] Scaffold build fails when using custom dependency."

#### **3\. Description**

Elaborate on the issue.

* What were you trying to do?  
* What happened?  
* What did you expect to happen?

#### **4\. Steps to Reproduce (for \[BUG\] and \[IMPROVEMENT\] types)**

This is critical for bugs. List the exact steps someone else can follow to experience the issue.

1. Go to \[specific file/component/section\].  
2. Perform \[action 1\].  
3. Perform \[action 2\].  
4. Observe \[the unexpected behavior\].

#### **5\. Actual vs. Expected Behavior (for \[BUG\] types)**

* **Actual Behavior:** What did the scaffold *actually* do?  
* **Expected Behavior:** What *should* the scaffold have done?

#### **6\. Environment Information (if relevant)**

* Operating System (e.g., Windows 11, macOS Sonoma, Ubuntu 22.04)  
* Browser (e.g., Chrome, Firefox, Edge) \- though likely less relevant for a backend scaffold.  
* Node.js version, specific library versions, etc., if you suspect they play a role.

#### **7\. Screenshots/Recordings (Highly Recommended\!)**

* Visuals often convey more than words. Include screenshots of error messages, unexpected UI, or recordings of the steps to reproduce a bug.

#### **8\. Proposed Solution/Suggestion (Optional, for \[FEATURE REQUEST\] and \[IMPROVEMENT\] types)**

* If you have an idea on how to fix or implement the suggestion, feel free to include it.

### **Example Report:**


```md
# [BUG] Build fails with "Module not found" error for `lodash`

Description:  
I was attempting to build a new component using the scaffold's default setup, and it failed during the compilation phase. The console showed a "Module not found" error specifically for the 'lodash' package, even though I believe it should be included by default or correctly linked.

Steps to Reproduce:  
1.  Cloned the scaffold repository.  
2.  Ran `npm install` (or `yarn install`).  
3.  Executed the default build command: `npm run build` (or `yarn build`).  
4.  The build process terminated with the error message in the console.

Actual Behavior:  
The build process failed and outputted "Module not found: Can't resolve 'lodash' in '[path_to_some_scaffold_internal_directory]'"

Expected Behavior:  
The build process should complete successfully without any module resolution errors.

Environment:  
OS: macOS Sonoma 14.4.1  
Node.js: v18.17.1

```

Thank you for your meticulous reporting\! Your efforts are vital to the success of this scaffold.