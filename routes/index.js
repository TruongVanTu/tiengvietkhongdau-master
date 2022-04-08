var express = require('express');
var router = express.Router();
var fs = require('fs') ;

var  db = 'mongodb+srv://tutvph14566:vantu23122002@cluster0.cl8kd.mongodb.net/truongtu?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const {handle} = require("express/lib/router");
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra")
});
/* GET home page. */
router.get('/', function (req, res, next) {
    // xu ly du lieu hoac la truy van vao database

    res.render('index', {title: 'Express' });

});

router.get('/asia',function (req,res) {
    console.log('asia')
    res.render('category',{title : 'Asia'});
})
router.get('/euro',function (req,res) {

    console.log('euro')
    res.render('category',{title : 'Euro'});
})
router.get('/america',function (req,res) {
    console.log('America')
    res.render('category',{title : 'America'});
})

router.get('/about',function (req,res) {
    console.log('About')
    res.render('about',{title : 'About' , messgae : ''});
})

router.post('/support',function (req,res){
    var email = req.body.email ;
    var content = req.body.content ;
    var phone = req.body.phone ;
    console.log(email)
    console.log(content)
    console.log(phone)
    fs.appendFile( 'Files/'+email + '.txt',email+ '\n'+content+'\n' + phone, function (err){
        var message ;
        if (err){
            message = err ;
        }else {
            message : 'chúng tôi đã nhận được phản hồi'
        }
    }) ;
        res.render('about',{
            title :'About' ,
            message : 'chúng tôi đã nhận được thông tin'
        })
    }) ;


    router.post('/delete' , function (req,res){
        var email = req.body.email ;
        fs.unlink('Files/' + email + '.txt' , function (err){
            res.render('about', {
                title : 'About' ,
                message : err
            })
        })
    })
router.get('/photos' , function (req,res){
    res.render('photos')
})
router.get('/sanpham' , function (req,res){
    res.render('sanpham')
})

    // viết câu lệnh thêm vào coliision - student - database - mydata

    // bước 1 : định nghĩa Schema tương đương với model bên java
    const studentSchema = new mongoose.Schema({
        email : 'string' ,
        ten : 'string' ,
        sdt : 'string'
    }) ;
    // bước 2 : khai báo sche với thư viện mongosee
    // student : là tên của collection tạo phía trang mongodB ban nãy
    var truongtu = mongoose.model('truongtu',studentSchema) ;

router.post('/student' , function (req,res){
    var email = req.body.email ;
    var ten = req.body.name ;
    var sdt = req.body.SDT ;

    console.log(email + ten + sdt) ;

    const data = new truongtu({
        email : email ,
        ten : ten ,
        sdt : sdt
    }) ;
    data.save(function (error){
        var mes ;
        if (error == null){
            mes = 'them thanh cong'
            console.log('them thanh cong')
        }else mes = error
        res.render('photos' , {messgae : mes})
    })
    router.get('/allMobile' , function (req,res){
        // lấy danh sách
        truongtu.find({}, function (err, data){
           /* res.render('photos' ,{data:data})*/
            res.send(data)
        })
    })

    // xóa
    truongtu.deleteOne({_id : '62414c4b79577d8d2b8a8b65'} , function (error){

    })
    // sửa
    truongtu.updateOne({_id: ''} ,{email:'abc@gmail.com' , name :'AAAAAAA'} , function (error){

    })

})


module.exports = router;
