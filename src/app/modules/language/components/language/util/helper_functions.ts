export const getLanguageByFramework = (
  framework: string,
  languageFrameworks: { [key: string]: string[] }
): string | undefined => {
  for (const [language, frameworks] of Object.entries(languageFrameworks)) {
    if (
      frameworks.some(
        (f) =>
          f.toLowerCase().replace(/\s/g, '') ===
          framework.toLowerCase().replace(/\s/g, '')
      )
    ) {
      return language;
    }
  }
  return undefined; // Framework not found in any language
};

export const hasDashInName = (name: string): boolean => {
  return name.includes('-');
};

export interface FrameworkSearchResult {
  framework_exists: boolean;
  framework_name?: string;
}

export const frameworkExists = (
  all_frameworks: string[],
  frameworkToFind: string
): FrameworkSearchResult => {
  let matchingFrameworks = all_frameworks.filter(
    (framework) =>
      framework.toLowerCase().replace(/[\s.-]/g, '') ===
      frameworkToFind.toLowerCase().replace(/[\s.-]/g, '')
  );

  if (matchingFrameworks.length === 0) {
    return { framework_exists: false };
  }

  let framework_name = matchingFrameworks[0]; // Use the first matching framework's actual name
  return { framework_exists: true, framework_name };
};

export const getActualFrameworkName = (
  all_frameworks: string[],
  frameworkToFind: string
): string | undefined => {
  const matchingFrameworks = all_frameworks.filter(
    (framework) =>
      framework.toLowerCase().replace(/\s/g, '') ===
      frameworkToFind.toLowerCase().replace(/\s/g, '')
  );

  if (matchingFrameworks.length === 0) {
    return undefined; // Framework not found
  }

  // Convert each matching framework to its actual name with spaces
  const actualNames = matchingFrameworks.map((framework) =>
    framework.replace(/\s/g, ' ')
  )[0];

  return actualNames;
};
