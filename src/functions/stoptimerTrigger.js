const { app } = require('@azure/functions');
const { ComputeManagementClient } = require('@azure/arm-compute');
const { DefaultAzureCredential } = require('@azure/identity');

// Definiere die Timer-Trigger Funktion für das Stoppen der VM
app.timer('stoptimerTrigger', {
    schedule: '0 0 18 * * *', 
    handler: async (myTimer, context) => {
        context.log('VM Stop Timer Trigger ausgeführt.');
        
        // Azure Subscription ID und Ressourcengruppe/VM-Daten
        const subscriptionId = process.env['afsar.akhtari@docc.techstarter.de'];
        const resourceGroupName = 'rg-24-04-on-akhtari-afsar';
        const vmName = 'VM-Maintenance-Automation1';

        // Authentifizierung mit DefaultAzureCredential
        const credentials = new DefaultAzureCredential();
        const computeClient = new ComputeManagementClient(credentials, subscriptionId);

        try {
            // Stoppe die VM
            const stopResult = await computeClient.virtualMachines.beginDeallocateAndWait(resourceGroupName, vmName);
            context.log(`VM ${vmName} wurde gestoppt:`, stopResult);
        } catch (error) {
            context.log('Fehler beim Stoppen der VM:', error.message);
        }
    }
});