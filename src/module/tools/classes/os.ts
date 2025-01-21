

class Os {
    /**
     * @description: 
     */
    public path = new Path();

    constructor() {
        this.path = new Path();
    }
}

class Path {
    /**
     * @description: the equal fonction of os.path.join in python
     */
    public join(...paths: string[]): string {
        let path = '';
        for (let i = 0; i < paths.length; i++) {
            path += paths[i];
            if (i < paths.length - 1) {
                path += '/';
            }
        }
        return path;
    }
}

export const os = new Os();