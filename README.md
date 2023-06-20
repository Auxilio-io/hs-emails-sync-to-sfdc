# hs-emails-sync-to-sfdc

## What is it?
This coded files are intented to be used in a hubspot contact workflow within custom coded actions. They allow to create a task for each marketing email sent to a contact. You can then sync these tasks with Saleforce using the native integration between HS and SFDC. 

## How it works:

1. Create a private app within your HubSpot portal and name it HS_EMAILS_TO_SFDC
2. Give proper scopes to the private app: "crm.objects.contacts.write" "content"
3. Create a blank contact workflow
4. set trigger to Last marketing email send date is known
5. Activate re-enrollment triggers for Last marketing email send date is known
6. Add a custom coded action to the workflow
7. Create a secret with your private app token and name it HS_EMAILS_TO_SFDC
8. Select this secret in your custom coded action
9. Select the property Last marketing email name as an input in your custom coded action
10. Copy/paste the content of the get-email.js file in the code editor of your custom coded action
11. Select outputs: {url: string, subject: string, emailbodyPlaintext: string}
12. Save your custom coded action
13. Add a 2nd custom coded action to the workflow
14. Select HS_EMAILS_TO_SFDC secret in your custom coded action
15. Select the outputs of the first custom coded actions and the Last marketing email send date property as inputs in your custom coded action
16. Copy/paste the content of the create-task.js file in the code editor of your custom coded action
17. Select outputs: {taskId: number}
18. Save your 2nd custom coded action
19. Add a 3rd custom coded action to the workflow
20. Select HS_EMAILS_TO_SFDC secret in your custom coded action
21. Select the outputs of the 2nd custom coded actions and the Record ID property as inputs in your custom coded action
22. Copy/paste the content of the associate-task-with-contacts.js file in the code editor of your custom coded action
23. Save your 3rd custom coded action
24. Set your workflow to "on"
25. OPTIONNAL you can copy outputs to properties if needed

## How the workflow should look:
![HubSpot Workflow to sync Marketing Emails with Salesforce](/sync-marketing-emails-with-salesforce-task.png)
