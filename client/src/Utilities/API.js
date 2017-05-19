/**
 * `API` is the main interaction spot for our api
 */
class API {
    /**
     * Add default options to the given options, returning a new object.
     * {
     *  'credentials': 'include'
     * }
     * 
     */
    static mergeOptions(opts){
        const options = {
            'credentials': 'include'
        };

        if(opts){
           Object.assign(options, opts); 
        }

        return options;
    }

    /**
     * Login to Agile Central
     */
    static login(opts) {
        window.location.href = 'http://localhost:8080/api/login';
    }

    /**
     * Check if authorized
     */
    static checkAuth(opts) {
        var promise = fetch('/api/test', this.mergeOptions(opts));
        return promise;
    }

    /**
     * Retreive the user info
     */
    static getUser(opts){
        var promise = fetch('/api/user', this.mergeOptions(opts));
        return promise;
    }

    /**
     * Query for ?
     */
    static query(opts){
        var promise = fetch('/api/query', this.mergeOptions(opts));
        return promise;
    }

    /**
     * Retrieve object of type and ID
     */
    static object(type, id, opts){
        var promise = fetch('/api/object/type/' + encodeURIComponent(type) + '/' + id, this.mergeOptions(opts));
        return promise;
    }
    /**
     * Retrieve children from object
     */
    static objectChildren(childType, parentId, opts){
        var promise = fetch('/api/object/' + encodeURIComponent(childType) + '/' + parentId + '/children', this.mergeOptions(opts));
        return promise;
    }
    /**
     * Retreive by reference
     */
    static objectFromRef(ref, opts){
        var promise = fetch('/api/object/ref/' + encodeURIComponent(ref), this.mergeOptions(opts));
        return promise;
    }
}

export default API;