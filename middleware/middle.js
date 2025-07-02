function islogged(req,res,next){
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }
    const code = jwt.verify(token, process.env.JWT_SECRET);
    req.user = code;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
module.exports=islogged