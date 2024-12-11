const { app } = require('@azure/functions');
const { ComputeManagementClient } = require('@azure/arm-compute');
const { DefaultAzureCredential } = require('@azure/identity');

// Definiere die Timer-Trigger Funktion für das Starten der VM
app.timer('starttimerTrigger', {
    schedule: '0 */1 * * *', // Täglich um 8:00 Uhr
    handler: async (myTimer, context) => {
        context.log('VM Start Timer Trigger ausgeführt.');
        
        // Azure Subscription ID und Ressourcengruppe/VM-Daten
        const subscriptionId = process.env['afsar.akhtari@docc.techstarter.de'];
        const resourceGroupName = 'rg-24-04-on-akhtari-afsar';
        const vmName = 'VM-Maintenance-Automation1';

        // Authentifizierung mit DefaultAzureCredential
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