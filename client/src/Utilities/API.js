class API {

    static mergeOptions(opts){
        const options = {
            'credentials': 'include'
        };

        if(opts){
           Object.assign(options, opts); 
        }

        return options;
    }

    static login(opts) {
        window.location.href = 'http://localhost:8080/api/login';
    }

    static checkAuth(opts) {
        var promise = fetch('/api/test', this.mergeOptions(opts));
        return promise;
    }

    static getUser(opts){
        var promise = fetch('/api/user', this.mergeOptions(opts));
        return promise;
    }

    static query(opts){
        var promise = fetch('/api/query', this.mergeOptions(opts));
        return promise;
    }

    static object(type, id, opts){
        var promise = fetch('/api/object/' + encodeURIComponent(type) + '/' + id, this.mergeOptions(opts));
        return promise;
    }

    static objectChildren(childType, parentId, opts){
        var promise = fetch('/api/object/' + encodeURIComponent(childType) + '/' + parentId + '/children', this.mergeOptions(opts));
        return promise;
    }
}

export default API;