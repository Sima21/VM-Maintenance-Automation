# VM Maintenance Automation Projekt

Dieses Projekt dient der Automatisierung von Start- und Stopp-Prozessen für virtuelle Maschinen (VMs) in Azure mithilfe von Azure Function Apps und einem Timer-Trigger. Ziel ist es, die VM täglich um **8:00 Uhr zu starten** und um **18:00 Uhr zu stoppen**, um Ressourcen effizient zu nutzen.

---

## Schritte zur Umsetzung:

### 1. Erstellen einer Resource Group
- Eine Resource Group wurde in Azure erstellt, um alle relevanten Ressourcen zu organisieren.

### 2. Deployment eines Azure Storage Accounts
- Ein Azure Storage Account wurde erstellt, um die Funktionalitäten der Azure Functions zu unterstützen.
- Die Zugriffsschlüssel (`Connection String`) wurden in der Konfiguration genutzt.

### 3. Entwicklung von Timer-basierten Azure Functions
- Zwei Timer-Trigger-Funktionen wurden erstellt:
  - **Start-Timer (starttimerTrigger.js)**: Startet die VM täglich um **8:00 Uhr**.
  - **Stop-Timer (stoptimerTrigger.js)**: Stoppt die VM täglich um **18:00 Uhr**.
- Der Zeitplan wurde im `cron`-Format definiert:
  - Start: `0 8 * * *` (8:00 Uhr)
  - Stop: `0 18 * * *` (18:00 Uhr)

### 4. Konfiguration der `local.settings.json`
- Die Datei `local.settings.json` wurde erstellt und konfiguriert, um die notwendigen Verbindungen und Variablen bereitzustellen:
  - **AzureWebJobsStorage**: Verbindung zum Storage Account.
  - **Umgebungsvariablen**: Details zur Ressourcengruppe, VM-Name und Subscription-ID.

### 5. Bereitstellung der Funktionen in Azure
- Die Funktionen wurden mithilfe des Azure-CLI-Tools und Visual Studio Code in eine Azure Function App (`VM-Maintenance-Automation`) bereitgestellt.

### 6. Überwachung und Logging
- **Application Insights** wurde aktiviert, um die Funktionalität und Leistung der Azure Functions zu überwachen.
- Logs wurden analysiert, um Fehler und Probleme zu identifizieren.

 ### 7. Kostenanalyse
- Basierend auf den Daten und dem Kostenvergleich ist es finanziell vorteilhafter, in Automatisierungstechnologien zu investieren, da die langfristigen Einsparungen die anfänglichen Investitionskosten übersteigen. Automatisierung reduziert manuelle Eingriffe und optimiert Betriebsabläufe, was zu niedrigeren laufenden Kosten führt. Die genauen Zahlen aus den TCO-Kalkulationen unterstützen die Schlussfolgerung, dass Automatisierung eine kluge finanzielle Entscheidung für Unternehmen darstellt, die ihre Effizienz steigern und Betriebskosten senken möchten.


---

## Herausforderungen und Lösungen:

1. **Einstieg in Azure Functions**: Der Einstieg in Azure Functions war aufgrund fehlender Erfahrung eine Herausforderung, was eine intensivere Einarbeitung erforderte.

2. **VM-Erstellung**: Ursprünglich war die Automatisierung der VM-Erstellung mit einem ARM-Template geplant, aber aufgrund von Hindernissen wurde diese Lösung verworfen. Stattdessen haben wir die VM manuell im Azure-Portal eingerichtet und über Azure Functions gesteuert, was einfacher umzusetzen war.

3. **Umgebungsvariablen**: Es gab Schwierigkeiten bei der Konfiguration von Umgebungsvariablen in der Function App. Einige Variablen wurden nicht korrekt übergeben, was die Kommunikation mit der VM beeinträchtigte. Diese Probleme konnten jedoch erfolgreich gelöst werden.

4. **Zeitplanfehler**: Zu Beginn hatten wir Schwierigkeiten mit der korrekten Definition des Zeitplans für das Starten und Stoppen der VM. Nachdem wir die `cron`-Syntax angepasst hatten, lief der Zeitplan wie gewünscht.

5. **Die größte Herausforderung**: Die größte Herausforderung war es, den richtigen Einstieg in das Projekt zu finden, da es viele verschiedene Aspekte gab, die gleichzeitig berücksichtigt werden mussten, insbesondere der Umgang mit den Azure-spezifischen Konfigurationen und der sicheren Implementierung der Automatisierung. Nach und nach konnten wir jedoch alle Probleme erfolgreich lösen.

## Nächste Schritte:

1. **Dashboard-Integration**:
   - Erstellung eines Dashboards zur Überwachung der VM-Performance und Ressourcennutzung.
   
3. **Weiterentwicklung**:
   - Hinzufügen zusätzlicher Funktionen wie Benachrichtigungen bei Fehlern oder Abweichungen im Zeitplan.

---

## Anforderungen:
- **Azure CLI**
- **Visual Studio Code** mit Azure Functions Extension
- **Node.js** (Version entsprechend der Azure Function Runtime)


