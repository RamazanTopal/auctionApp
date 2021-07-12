const User = require('../models/User');
const Product = require('../models/Product');
const Offer = require('../models/Offer');
const { v4: uuidv4 } = require('uuid');

//CUSTOMER
exports.getProduct = async (req, res) => {
    /*Ürünlerimizi max 10 dakika  boyunca durması için aggregate işlemi yapıyoruz.$lt:0.16 bize admin tarafından oluşturulan ürünlerimizin max 10 dakika boyunca /product sayfamızda kalmasını sağlıyor.*/
    const products=await Product.aggregate([
      { "$project": { name:1,price:1,
        "difference": {
          "$divide": [
            { "$subtract": [new Date(), "$start_date"] },
            60 * 1000 * 60
          ],
       
        }
      }},
      { "$group": {
        "_id": "$_id",
        "totalDifference": { "$sum": "$difference" },
        "name": { "$first": "$name" }, 
         "price":{"$first":"$price"},
      }}, {$sort: {_id: -1}},
      { "$match": { "totalDifference": { "$lt": 0.16 }}}
    ])
    /*Aggregate yaptığımız ürünlerimizi products isimli değişkene yukarıda atama işlemi yaptık.Bunları /product sayfamızda göstermek için res.render ile bu degişkeni products.ejs sayfamıza atıyoruz*/
    res.render('product',{
      products:products
    })

};
exports.postOffer=async (req, res) => {
  let product=await Product.findById(req.params.id).populate("offerer");
  /*Bu kısımda teklif işlemlerini yapıyoruz.Aşağıdaki if koşulu ile ürünümüzün fiyatından daha fazla ücret istiyoruz.Eğer düşük ücret girildiyse olumsuz geri dönüş yapıyoruz*/
  if(product.price>=req.body.offer){
    req.flash("error", "Offer is insufficient. Please enter a higher number");
    res.redirect("/product?offer=cancel");
  }else{
    /*Bu kısımda ise yaptığımız teklif ürünün fiyatından yüksek ama diğer tekliflerden aşağıdaysa yine olumsuz geri dönüş yapıyoruz */
    for (let i=0; i< product.offerer.length; i++) {
      if(product.offerer[i].price>=req.body.offer){
        req.flash("error", "Offer is insufficient. Please enter a higher number");
        res.redirect("/product?offer=cancel");
      }
    }
    
    if(userIN){
      /*Bu kısımda ise kullanıcımızın id'si varsa rastgele id ataması yapmadan mevcut id ile teklif vermesini sağlıyoruz */
      const off=await Offer.create({price:req.body.offer,name:req.session.userID,product:req.params.id});
      product.offerer.push(off._id);
      await product.save();
      req.flash("success", "Your offer has been accepted.");
      res.redirect('/product')
    }else{
       /*Bu kısımda ise kullanıcımız tarafından bir teklif yapıldığında otomatik bir id ataması yapıyoruz.Bu işlem için uuidv4 modülünü kullanıyoruz. */
      req.session.userID=uuidv4()
      const off=await Offer.create({name:req.session.userID,price:req.body.offer,product:req.params.id});
      product.offerer.push(off._id);
      await product.save(); 
      req.flash("success", "Your offer has been accepted.");
      res.redirect('/product')
    }
  


 
  }
};

exports.getCustomerDetailOffer = async (req, res) => {
  /*Bu kısımda kullanıcı tarafından diğer tekliflerin hepsini görmesini sağlıyoruz*/
  const products=await Product.findById(req.params.id).populate("owner").populate("offerer");
 
  res.render('all_offer',{products:products});
};
//ADMİN
exports.getDashboardPage = async (req, res) => {
  /*Admin oluşturduğu ürünleri dashboard sayfasından kontrol edebiliyor.*/
    const products=await Product.find({owner:req.session.userID});
    res.render('admin_dashboard',{products:products});
};

exports.createProduct=async (req,res)=>{
 
    try{
       /*Admin tarafından yeni ürün ekliyoruz.*/
       await Product.create({
        name: req.body.name,
        price: req.body.price,
        owner: req.session.userID
      });

      req.flash("error", "We create succesfully");
      res.status(201).redirect('/product/dashboard')
    }catch(err){
      req.flash("error", "We don't create succesfully");
      res.status(400).redirect('/product/dashboard')
    }
}

exports.getDetailOffer=async (req, res) => {
   /*Admin tarafından tüm teklifleri görebiliyoruz*/
  const products=await Product.findById(req.params.id).populate("owner").populate("offerer");
  res.render('offer',{
    products:products
  })
};
exports.deleteProduct=async (req, res) => {
  /*Admin dashboard sayfasından eklediği ürünü silebiliyor*/
  await Product.findOneAndDelete(req.params.id);
  await Offer.deleteMany({product:req.params.id});
  res.redirect('/product/dashboard?delete=true');
};