export const LOCATIONS = {
  START: ".",
  PREFERENCES: "/Preferences",
  EDITOR: "/Editor"
}

export const FILES = {
  CONFIG: 'config.ini', 
  RECENT_FILES: 'recent.ini'
}

export const AUTOSAVE_PATH = './autosave/';

export const MODE_RINCEWIND = 'MODE_RINCEWIND';
export const MODE_MD = 'MODE_MD';

export const SAMPLE_CODE = `# start

- \`Terry Pratchett $t\`:  
    heya.

- Tom Bombadil:
    * Hi Folk
    * Hey 
    * [Follow me!](#followMe) | $_bIsFollowingYou = 0
    
- Terry Pratchett:
    What can I do you for? | $_bIsFollowingYou = 1

- Tom Bombadil:
    * Just say hello
    * [Could you give me some money?](#money)
    * [Nothing.](#end)

- Terry Pratchett:
   [Hello good sir, bye](#end)

# followMe
\`\`\`
$call \`FollowMe\`
\`\`\`
-Terry Pratchett:
    [Ok, Ill follow you!](#end)


# money
- Terry Pratchett:
    Are you kidding me? Get out of here!

# end`;
