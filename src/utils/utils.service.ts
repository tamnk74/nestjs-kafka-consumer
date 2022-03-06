export class UtilsService {
  static generateRandomInteger(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  static generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .toUpperCase()
      .substr(0, length);
  }

  static splitModuleFromUrl(url: string): string | undefined {
    const match = url.match(/\/api(\/v[0-9]+)?\/([^/?]*)\/?\??/); //check URL matching with /api/v[0-9]/
    if (match) {
      const moduleName = match[2] ?? '';
      if (moduleName.includes('?')) {
        return moduleName.split('?')[0];
      }
      return moduleName;
    }
    return undefined;
  }
}
