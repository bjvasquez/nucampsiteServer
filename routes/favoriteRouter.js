const express = require('express');
const bodyParser = require('body-parser');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    // This is the correct user id     console.log(req.user._id);
    //Favorite.find()
    //.populate('favorites.user')
    //.populate('favorites.campsites')
    //Favorite.findById(jwt_payload._id)
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            console.log("Current user has a favorites doc!");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite.campsites);
        } else {
            console.log("This user does not have a favorites doc!");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);            
        }
    })
    .catch(err => next(err));    
})

//POST to /favorites: When the user does a POST operation on '/favorites' by including a message in the format of [{"_id":"campsite ObjectId"},  . . . , {"_id":"campsite ObjectId"}] in the body of the message (see Testing section for example), you will check if the user has an associated favorite document.
//If so, then you will check which campsites in the request body are already in the campsites array of the favorite document, if any, and you will only add to the document those that are not already there. The use of JavaScript array methods forEach, includes/indexOf, and push will help you with this task.
//If there is no favorite document for the user, you will create a favorite document for the user and add the campsite IDs from the request body to the campsites array for the document. 
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            console.log("Current user has a favorites doc!");
            favorite.campsites.push(req.body);
            favorite.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite.campsites);
        } else {
            console.log("This user does not have a favorites doc!  Creating one now...");
            Favorite.create({user: req.user._id, campsites: req.body})
            .then(favorite => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));    
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.deleteOne({user: req.user._id})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

//     Favorite.create(req.body)
//     .then(favorite => {
//         console.log('Favorite Created ', favorite);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(favorite);
//     })
//     .catch(err => next(err));
// })   

// .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     //res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
//     Partner.create(req.body)
//     .then(partner => {
//         console.log('Partner Created ', partner);
//         res.statusCode = 200;
//         res. setHeader('Content-Type', 'application/json');
//         res.json(partner);
//     })
//     .catch(err => next(err));
// })


//             req.body.author = req.user._id;
//             campsite.comments.push(req.body);
//             campsite.save()
//             .then(favorite.campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite.campsite);
//             })
//             .catch(err => next(err));            
//         } else {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(favorites);
//         }
//     }


        
//             Campsite.findById(req.params.campsiteId)
//             .then(campsite => {
//                 if (campsite) {
//                     req.body.author = req.user._id;
//                     campsite.comments.push(req.body);
//                     campsite.save()
//                     .then(campsite => {
//                         res.statusCode = 200;
//                         res.setHeader('Content-Type', 'application/json');
//                         res.json(campsite);
//                     })
//                     .catch(err => next(err));
//                 } else {
//                     err = new Error(`Campsite ${req.params.campsiteId} not found`);
//                     err.status = 404;
//                     return next(err);
//                 }
//             })
//             .catch(err => next(err));
//         })




//         .then(favorites => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(favorites);
//         })
//         .catch(err => next(err));
    



//         if (err) {
//             return document(err, false);
//         } else if (user) {
//             console.log("Found user match");
//             return document(null, user);
//         } else

//     })
//     .then(favorites => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(favorites);
//     })
//     .catch(err => next(err));
// })

    //req.user._id

        //   User.findOne({_id: jwt_payload._id}, (err, user) => {
        //         if (err) {
        //             return done(err, false);
        //         } else if (user) {
        //             return done(null, user);
        //         } else {
        //             return done(null, false);
        //         }
        //     });
        // deletemelater
        // Campsite.findById(req.params.campsiteId)
        // .then(campsite => {
        //     if (campsite) {
        //         req.body.author = req.user._id;
        //         campsite.comments.push(req.body);
        //         campsite.save()
        //         .then(campsite => {
        //             res.statusCode = 200;
        //             res.setHeader('Content-Type', 'application/json');
        //             res.json(campsite);
        //         })
        //         .catch(err => next(err));
        //     } else {
        //         err = new Error(`Campsite ${req.params.campsiteId} not found`);
        //         err.status = 404;
        //         return next(err);
        //     }
        // })



.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})

//POST to /favorites/:campsiteId: When the user performs a POST operation on '/favorites/:campsiteId', 
//then you will add the campsite specified in the URL parameter to the list of the user's list of favorite
//campsites, if the campsite is not already in the list of favorites. If the campsite is already in the list, 
//then respond with a message saying "That campsite is already in the list of favorites!" 
//If the user has not previously defined any favorites, then you will need to create a new Favorite document 
//for this user. Note: As a bonus challenge, you could add error checking to make sure that the campsiteId in
//the URL parameter corresponds to a valid campsite, but it is not required for this assignment. 

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /favorites/${req.params.campsiteId}`);    
 })
 .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            console.log("Current user has a favorites doc!");
            console.log(`Checking if ${req.params.campsiteId} is already a favorite...`);
            if(!favorite.campsites.includes(req.params.campsiteId)) {
                favorite.campsites.push(req.params.campsiteId);
                favorite.save();
                console.log(`${req.params.campsiteId} was added to the list of favorites.`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite.campsites);
            }
            else {
                console.log(`${req.params.campsiteId} already existed in your list of favorites.`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite.campsites);
            }
        } else {
            console.log("This user does not have a favorites doc!  Creating one now...");
            Favorite.create({user: req.user._id, campsites: req.params.campsiteId})
            .then(favorite => {
                console.log(`A new favorites list was created and ${req.params.campsiteId} was added.`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));  
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/:campsiteId');
})

//DELETE to /favorites/:campsiteId: When the user performs a DELETE operation on '/favorites/:campsiteId', 
//then you will remove the specified campsite from the list of the user's list of favorites.

.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            console.log("Current user has a favorites doc!");
            console.log(`Checking if ${req.params.campsiteId} exists before deleting...`);
            if(!favorite.campsites.includes(req.params.campsiteId)) {
                //favorite.campsites.push(req.params.campsiteId);
                //favorite.save();
                console.log(`${req.params.campsiteId} is not in your list of favorites.`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite.campsites);
            }
            else {
                console.log(`${req.params.campsiteId} was found and will be deleted!`);
                favorite.campsites.splice(favorite.campsites.indexOf(req.params.campsiteId), 1); 
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite.campsites);
            }
        } else {
            console.log("This user does not have a favorites doc!  Creating one now...");
            Favorite.create({user: req.user._id, campsites: req.params.campsiteId})
            .then(favorite => {
                console.log(`A new favorites list was created and ${req.params.campsiteId} was added.`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));  
 });




// campsiteRouter.route('/:campsiteId/comments')
// .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
// .get(cors.cors, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .populate('comments.author')
//     .then(campsite => {
//         if (campsite) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(campsite.comments);
//         } else {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (campsite) {
//             req.body.author = req.user._id;
//             campsite.comments.push(req.body);
//             campsite.save()
//             .then(campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(campsite);
//             })
//             .catch(err => next(err));
//         } else {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
//     res.statusCode = 403;
//     res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (campsite) {
//             for (let i = (campsite.comments.length-1); i >= 0; i--) {
//                 campsite.comments.id(campsite.comments[i]._id).remove();
//             }
//             campsite.save()
//             .then(campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(campsite);
//             })
//             .catch(err => next(err));
//         } else {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// });

// campsiteRouter.route('/:campsiteId/comments/:commentId')
// .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
// .get(cors.cors, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .populate('comments.author')
//     .then(campsite => {
//         if (campsite && campsite.comments.id(req.params.commentId)) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(campsite.comments.id(req.params.commentId));
//         } else if (!campsite) {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         } else {
//             err = new Error(`Comment ${req.params.commentId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
// })
// .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (campsite && campsite.comments.id(req.params.commentId) && (campsite.comments.id(req.params.commentId).author).equals(req.user._id)) {
//             if (req.body.rating) {
//                 campsite.comments.id(req.params.commentId).rating = req.body.rating;
//             }
//             if (req.body.text) {
//                 campsite.comments.id(req.params.commentId).text = req.body.text;
//             }
//             campsite.save()
//             .then(campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(campsite);
//             })
//             .catch(err => next(err));
//         } else if (!campsite) {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         } else if (!(campsite.comments.id(req.params.commentId).author).equals(req.user._id)) {
//             err = new Error(`Users cannot edit comments of others.`);
//             err.status = 403;
//             return next(err);
//         } else {
//             err = new Error(`Comment ${req.params.commentId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (campsite && campsite.comments.id(req.params.commentId) && (campsite.comments.id(req.params.commentId).author).equals(req.user._id)) {
//             campsite.comments.id(req.params.commentId).remove();
//             campsite.save()
//             .then(campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(campsite);
//             })
//             .catch(err => next(err));
//         } else if (!campsite) {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         } else if (!(campsite.comments.id(req.params.commentId).author).equals(req.user._id)) {
//             err = new Error(`Users cannot delete comments of others.`);
//             err.status = 403;
//             return next(err);
//         } else {
//             err = new Error(`Comment ${req.params.commentId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// });

module.exports = favoriteRouter;