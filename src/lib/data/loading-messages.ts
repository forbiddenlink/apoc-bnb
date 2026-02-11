// Funny apocalyptic loading messages for APOC-BNB
export const loadingMessages = [
  "Checking for mutants...",
  "Counting bottle caps...",
  "Securing the perimeter...",
  "Decontaminating...",
  "Bribing the guards...",
  "Hiding from raiders...",
  "Updating survival manual...",
  "Calibrating Geiger counter...",
  "Scanning for radiation...",
  "Checking bunker availability...",
  "Negotiating with the wasteland...",
  "Loading radioactive content...",
  "Consulting the Overseer...",
  "Verifying fallout-free zones...",
  "Syncing with Pip-Boy...",
  "Questioning life choices...",
  "Preparing emergency rations...",
  "Avoiding Brotherhood patrols...",
  "Testing air filtration systems...",
  "Encrypting with pre-war tech...",
];

export function getRandomLoadingMessage(): string {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}
