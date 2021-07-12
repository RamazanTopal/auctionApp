const User = require('../models/User');
const bcrypt=require('bcrypt');
exports.getRegister = async (req, res) => {
  res.render('register')
};
exports.postRegister = async (req, res) => {
  /*kullanıcı kayıt işlemini yapıyor*/
  try {
      await User.create(req.body);
      res.redirect("/user/login")
  } catch (error) {
    res.status(400).redirect('/user/register');
  }
};
exports.getLogin = async (req, res) => {
  res.render('login')
  };
  exports.postLogin = async (req, res) => {
    /*kullanıcı giriş işlemini yapıyor*/
  try {
    /*form tarafından girilen email ve passwordu alıyoruz*/
    const { email, password } = req.body;
   
    await User.findOne({ email }, (err, user) => {
       
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            /*Girilen email adresini kontrol ediyoruz.Böyle bir email adresi varsa ve şifreside doğruysa session'a bu bilgileri atıyoruz.Sonraki tüm işlemler bu sessionlar üzerinden hallediliyor.*/
            req.session.userID = user._id;
            req.session.user=user;
            res.status(200).redirect('/product');
          }else{
            res.status(400).redirect('/login');
          }
        });
      }else{
        res.status(400).redirect('/login');
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}; 

exports.getLogout=async (req, res) => {
  /*Kullanıcı veya admin çıkış butonuna tıklayınca sessionu sıfırlıyoruz.Böylelikle çıkış yapmış oluyoruz*/
  req.session.destroy(()=> {
    res.redirect('/');
  })
};