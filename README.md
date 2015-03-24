# Angular/Meteor/CollectionFS issues

I created this project to expose some problems I currently have with the combination of Meteor, Angular, CollectionFS and Velocity.
The main goal here is to contribute to make all these good things to work gracefully together. So here are the related bugs I intend to
fix :

## https://github.com/CollectionFS/DEPRECATING-cfs-file/issues/9

The problem here is that when I updated the content of a store with a formatted content of another one, I have to change the updatedAt property
manually.

https://github.com/epotvin/thumbnail-example/blob/master/model.js#L24-L27

The reason I want this to work is because I want the thumbnail to be updated reactively when someone update it from the original.

## https://github.com/Urigo/angular-meteor/issues/72

This issue is more a feature request then a bug. It would be really cool to deal with a cfs collection like a normal collection.
After I have finish with this I intend to try this example with the change @netanelgilad has tried. It seems to be the fix I need.

About these lines :

https://github.com/epotvin/thumbnail-example/blob/master/client/example.js#L33-L40

If I replace them with a simple line like this :

```javascript
return image.url({store: store}) + '&updatedAt=' + image.copies[store].updatedAt.getTime();
````

as I would have expected to be able to be, I fall in a digest loop throwing errors.

About these : https://github.com/epotvin/thumbnail-example/blob/master/client/example.js#L45-L49

I think the fix of @netanelgilad is exactly what will solve it.

## https://github.com/Urigo/angular-meteor/issues/234

When meteor starts, Karma have a hard time with angular and cfs. In the console of the second window opened by karma, I have the following errors :

Failed to load resource: the server responded with a status of 404 (Not Found)
cfs_access-point.js?0bfe974ee453abef55cf9a71244e13121aabc0a3:284 failed [404] NOT FOUND
http://localhost:9876/client/example.ng.html Failed to load resource: the server responded with a status of 404 (Not Found)
http://localhost:9876/client/image.ng.html Failed to load resource: the server responded with a status of 404 (Not Found)

