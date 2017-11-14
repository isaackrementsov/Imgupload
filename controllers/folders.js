module.exports = {
    uploads: function(req,res){
        if(req.session.user){
            var Image = require("../models/images").Image;
            Image.find({'folder':"uploads"}, function(err,docs){
                var displayedimages = docs;
                res.render("showimages", {displayedimages:displayedimages, session:req.session.user, sessionstatus:req.session.status});
            });
        }else{
            res.redirect("/");
        };
    },
    good: function(req,res){
        if(req.session.user){
            var Image = require("../models/images").Image;
            Image.find({'folder':"good"}, function(err,docs){
                    var displayedimages = docs;
                res.render("showimages", {displayedimages:displayedimages, session:req.session.user, sessionstatus:req.session.status});
            });
        }else{
            res.redirect("/");
        };
    },
    better: function(req,res){
        if(req.session.user){
            var Image = require("../models/images").Image;
              Image.find({'folder':"better"}, function(err,docs){
                    var displayedimages = docs;
                res.render("showimages", {displayedimages:displayedimages, session:req.session.user, sessionstatus:req.session.status});
            });
        }else{
            res.redirect("/");
        };
    },
    best: function(req,res){
        if(req.session.user){
            var Image = require("../models/images").Image;
            Image.find({'folder':"best"}, function(err,docs){
                var displayedimages = docs;
                res.render("showimages", {displayedimages:displayedimages,session:req.session.user, sessionstatus:req.session.status});
            });
        }else{
            res.redirect("/");
        };
    }
}