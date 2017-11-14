module.exports = {
    home: function(req, res){
        if(req.session.user){
            console.log(req.session.user);
            if(req.session.status == true){
            res.render("clienthome", {session:req.session.user, sessionstatus:req.session.status});
            }else{
                res.redirect("/view");
            }
        }else{
            res.redirect("/");
        };
    },
        other: function(req,res){
            if(req.session.user){
            }else{
                res.redirect("/");
            };
    }
}