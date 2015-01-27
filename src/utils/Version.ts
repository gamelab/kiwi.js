/**
* 
* @module Kiwi
* @submodule Utils
*/

module Kiwi.Utils {

    /**
    * Deals with parsing and comparing semver style version numbers
    * @class Version
    * @constructor
    * @namespace Kiwi.Utils
    */
    export class Version {

        /**
        * Parses a string such as "1.2.3" and returns an oject containing numeric properties for majorVersion, minorVersion and patchVersion
        * @method parseVersion
        * @param version {String}
        * @return {Object} Object with properties majorVersion, minorVersion, patchVersion.
        * @public
        * @static
        */
        public static parseVersion(version: string) {
            var split: Array<string> = version.split(".");
            return {
                majorVersion: parseInt(split[0]),
                minorVersion: parseInt(split[1]),
                patchVersion: parseInt(split[2])
            }  
        }

        /**
        * Compares two semver version strings such as "0.1.0" and "0.2.1".
        * Returns "greater", "less" or "equal".
        * @method compareVersions
        * @param version1 {String}
        * @param version2 {String}
        * @return {String} "greater", "less" or "equal"
        * @public
        * @static
        */
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

        /**
        * Compares two semver version strings such as "0.1.0" and "0.2.1". Returns true if version1 is greater than version2. 
        * @method greaterOrEqual
        * @param version1 {String}
        * @param version2 {String}
        * @return {boolean}
        * @public
        * @static
        */
        public static greaterOrEqual(version1: string, version2: string): boolean {
            var comp = Version.compareVersions(version1, version2);
            return (comp == "greater" || comp == "equal");
        }

    }

}
