module.exports = {
    upload: function(req,res){
        var Image = require("../models/images").Image;
        Image.create({title:req.body.tite, filename: req.file.filename, folder: req.body.folder, mimetype:req.file.mimetype, size: req.file.size}, function(err, instance){
            if(err){
                return handleError(err);
            };
        });
        res.redirect("client");
    },
    view: function(req,res){
        if(req.session.user){
            res.render("viewimages", {session:req.session.user, sessionstatus:req.session.status});
        }else{
            res.redirect("/");
        };
    },
    delete: function(req,res){
        var fs = require("fs");
        var Image = require("../models/images").Image;
        fs.unlink('../krementcookdev-new/public/img/' + req.body.deletepath + '/' + req.body.deleteimage, function(err){
            if(err){
                console.log(err);
            }
        });
        Image.remove({'filename':req.body.deleteimage}, function(err){
            if(err){
                res.redirect("/view");
            }else{
                res.status(204).end();
                res.redirect("/view");
            }
        });
    }
}
