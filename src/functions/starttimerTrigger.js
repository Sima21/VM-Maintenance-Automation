const { app } = require('@azure/functions');
const { ComputeManagementClient } = require('@azure/arm-compute');
const { DefaultAzureCredential } = require('@azure/identity');

app.timer('starttimerTrigger', {
    schedule: '0 8 * * *', 
    handler: async (myTimer, context) => {
        context.log('VM Start Timer Trigger ausgeführt.');
        
        
        const subscriptionId = process.env['afsar.akhtari@docc.techstarter.de'];
        const resourceGroupName = 'rg-24-04-on-akhtari-afsar';
        const vmName = 'VM-Maintenance-Automation1';

        
        const credentials = new DefaultAzureCredential();
        const computeClient = new ComputeManagementClient(credentials, subscriptionId);

        try {
            // Starte die VM
            const startResult = await computeClient.virtualMachines.beginStartAndWait(resourceGroupName, vmName);
            context.log(`VM ${vmName} wurde gestartet:`, startResult);
        } catch (error) {
            context.log('Fehler beim Starten der VM:', error.message);
        }
    }
});