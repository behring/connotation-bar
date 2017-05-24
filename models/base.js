/**
 * Created by behring on 2017/5/12.
 */
const AV = require('leanengine');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Base extends AV.Object {
    static createByRelation(attrs) {
        const obj = new this();
        Object.keys(attrs).forEach(k => {
            if (k.endsWith("Id")){
                const objClassName = k.replace(/Id$/, '');
                obj.set(objClassName, AV.Object.createWithoutData(capitalizeFirstLetter(objClassName), attrs[k]))
            } else {
                obj.set(k, attrs[k])
            }
        });
        return obj.save();
    }

    static create(attrs) {
        const obj = new this();
        Object.keys(attrs).forEach(k => {
            obj.set(k, attrs[k])
        });
        return obj.save();
    }

    static queryBy(attrs, relations=[]) {
        const query = new AV.Query(this);
        Object.keys(attrs).forEach(k => {
            query.equalTo(k, attrs[k]);
        });

        relations.forEach(relation => {
            query.include(relation);
        });

        return query.find();
    }

    static queryOneBy(attrs) {
        const query = new AV.Query(this);
        Object.keys(attrs).forEach(k => {
            if (k.endsWith("Id")){
                const objClassName = k.replace(/Id$/, '');
                query.equalTo(objClassName, AV.Object.createWithoutData(capitalizeFirstLetter(objClassName), attrs[k]));
            } else {
                query.equalTo(k, attrs[k])
            }
        });
        return query.first();
    }

    static find(id) {
        const query = new AV.Query(this);
        return query.get(id);
    }

    static pagination(page, count = 20, attrs = undefined, sortAttr = undefined, isAsc = true) {
        if(page > 0 && count > 0) {
            const query = new AV.Query(this);

            if(attrs) {
                Object.keys(attrs).forEach(k => {
                    if (k.endsWith("Id")){
                        const objClassName = k.replace(/Id$/, '');
                        query.equalTo(objClassName, AV.Object.createWithoutData(capitalizeFirstLetter(objClassName), attrs[k]));
                    } else {
                        query.equalTo(k, attrs[k])
                    }
                });
            }
            query.skip((page - 1) * count);
            query.limit(count);
            if(sortAttr) {
                if(isAsc) {
                    //升序排列
                    query.ascending(sortAttr);
                }else {
                    //降序排列
                    query.descending(sortAttr);
                }
            }

            return query.find();
        }
    }


    static update(obj, attrs) {
        Object.keys(attrs).forEach(k => {
            obj.set(k, attrs[k])
        });
        obj.save();
    }

    static count(attrs = undefined) {
        const query = new AV.Query(this);
        if(attrs) {
            Object.keys(attrs).forEach(k => {
                query.equalTo(k, attrs[k])
            });
        }
        return query.count();
    }
}

module.exports = Base;