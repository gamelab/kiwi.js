module Kiwi.Utils {

    export class Version {

        public static parseVersion(version: string) {
            var split: Array<string> = version.split(".");
            return {
                majorVersion: parseInt(split[0]),
                minorVersion: parseInt(split[1]),
                patchVersion: parseInt(split[2])
            }  
        }

        // version1 == version2
        public static compareVersions(version1: string, version2: string): string {
            var v1:any = Version.parseVersion(version1);
            var v2:any = Version.parseVersion(version2);
            if (v1.majorVersion > v2.majorVersion) {
                return "greater";    
            }
            if (v1.majorVersion < v2.majorVersion) {
                return "less";
            }
            // major versions must be equal
            if (v1.minorVersion > v2.minorVersion) {
                return "greater";
            }
            if (v1.minorVersion < v2.minorVersion) {
                return "less";
            }
            //minor versions must be equal
            if (v1.patchVersion > v2.patchVersion) {
                return "greater";
            }
            if (v1.patchVersion < v2.patchVersion) {
                return "less";
            }
            //patch versions must be equal
            return "equal";

        }

        public static greaterOrEqual(version1: string, version2: string): boolean {
            var comp = Version.compareVersions(version1, version2);
            return (comp == "greater" || comp == "equal");
        }

    }

}
