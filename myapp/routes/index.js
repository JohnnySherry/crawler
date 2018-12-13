var express = require('express');
var router = express.Router();
var https = require('https');
var cheerio = require('cheerio');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getJobs', function(req, res, next) {
  var page = req.param('page');
  console.log("page:"+page);
  var Res = res;
  var url = 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=sug&fromSearch=true&suginput=%E5%89%8D%E7%AB%AF'
  var option={
  	hostname: 'www.lagou.com',
  	path:'/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=sug&fromSearch=true&suginput=%E5%89%8D%E7%AB%AF',
  	headers:{
  		'Accept':'*/*',
        'Accept-Encoding':'utf-8',
        'Accept-Language':'zh-CN,zh;q=0.9',
        'Connection':'keep-alive',
        'Cookie':'WEBTJ-ID=20181213203522-167a79078156c8-0087848cab88af-3c604504-1764000-167a790781681c; _ga=GA1.2.78827282.1544704522; _gid=GA1.2.1342748428.1544704522; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1544704523; user_trace_token=20181213203518-8c985599-fed3-11e8-912c-525400f775ce; LGUID=20181213203518-8c985a0b-fed3-11e8-912c-525400f775ce; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22167a790fcd919b-0743bf9e900c33-3c604504-1764000-167a790fcda7be%22%2C%22%24device_id%22%3A%22167a790fcd919b-0743bf9e900c33-3c604504-1764000-167a790fcda7be%22%7D; sajssdk_2015_cross_new_user=1; _putrc=58DAE8FB21BA1D14123F89F2B170EADC; JSESSIONID=ABAAABAAAGFABEF949A62DFC92FC39DB7D0373B46C7284C; login=true; unick=%E6%8B%89%E5%8B%BE%E7%94%A8%E6%88%B79736; showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; hasDeliver=0; gate_login_token=15fd4bdd0991133e8c8ac1fa0d1e6e621fa9cfe8bbaba2cf9eb2430a3ac4ae50; index_location_city=%E5%85%A8%E5%9B%BD; TG-TRACK-CODE=search_code; SEARCH_ID=4db7cdc95d744597bd023f9459d8c0f7; _gat=1; LGSID=20181213220402-f224eb9d-fedf-11e8-8cef-5254005c3644; PRE_UTM=; PRE_HOST=; PRE_SITE=https%3A%2F%2Fwww.lagou.com%2F; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_%25E5%2589%258D%25E7%25AB%25AF%3FlabelWords%3Dsug%26fromSearch%3Dtrue%26suginput%3D%25E5%2589%258D%25E7%25AB%25AF; LGRID=20181213220402-f224f00a-fedf-11e8-8cef-5254005c3644; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1544709847',
        'Host':'www.lagou.com',
        'Referer':'https://www.lagou.com/'
  	}
  }
  https.get(option,(res)=>{
  	 var chunks = [];
  	 res.on('data',(d)=>{
  	 	chunks.push(d);
  	 })
  	 res.on('end',function(){
  	 	var data = Buffer.concat(chunks);
  	 	var html = data.toString();
  	 	console.log(html);
  	 	fs.writeFile(__dirname+'/message.txt',html,function(err){
  	 		if(err) console.log('failure');
  	 		else console.log('success');
  	 	})
  	 	// console.log(html);
  	 	var $ = cheerio.load(html);
  	 	var jobs = [];
  	 	var job_list = $(".item_con_list li");

  		// $(".item_con_list li").each(function(){
  		// 	var job = {};
  		// 	 job.company = $(this).find(".hot_pos_r div").eq(1).find("a").html(); //公司名
    //          job.period = $(this).find(".hot_pos_r span").eq(1).html(); //阶段
    //          job.scale = $(this).find(".hot_pos_r span").eq(2).html(); //规模

    //          job.name = $(this).find(".hot_pos_l a").attr("title"); //岗位名
    //          job.src = $(this).find(".hot_pos_l a").attr("href"); //岗位链接
    //          job.city = $(this).find(".hot_pos_l .c9").html(); //岗位所在城市
    //          job.salary = $(this).find(".hot_pos_l span").eq(1).html(); //薪资
    //          job.exp = $(this).find(".hot_pos_l span").eq(2).html(); //岗位所需经验
    //          job.time = $(this).find(".hot_pos_l span").eq(5).html(); //发布时间
 
    //          console.log(job.name);  //控制台输出岗位名
    //          jobs.push(job);  
    //      });
  		//  Res.json({
  		// 	jobs:jobs
  		//  });
  	 })
  })

  // https.get(url, function(res){
  // 	var chunks = [];
  // 	var size = 0;
  // 	res.on('data',function(chunk){
  // 		chunks.push(chunk);
  // 		size += chunk.length;
  // 	});
  // 	res.on('end',function(){
  // 		var data = Buffer.concat(chunks,size);
  // 		var html = data.toString();
  // 		var $ = cheerio.load(html);
  // 		var jobs = [];

  // 		var job_list = $(".item_con_list li");
  // 		$(".item_con_list>li").each(function(){
  // 			var job = {};
  // 			 job.company = $(this).find(".hot_pos_r div").eq(1).find("a").html(); //公司名
  //            job.period = $(this).find(".hot_pos_r span").eq(1).html(); //阶段
  //            job.scale = $(this).find(".hot_pos_r span").eq(2).html(); //规模

  //            job.name = $(this).find(".hot_pos_l a").attr("title"); //岗位名
  //            job.src = $(this).find(".hot_pos_l a").attr("href"); //岗位链接
  //            job.city = $(this).find(".hot_pos_l .c9").html(); //岗位所在城市
  //            job.salary = $(this).find(".hot_pos_l span").eq(1).html(); //薪资
  //            job.exp = $(this).find(".hot_pos_l span").eq(2).html(); //岗位所需经验
  //            job.time = $(this).find(".hot_pos_l span").eq(5).html(); //发布时间
 
  //            console.log(job.name);  //控制台输出岗位名
  //            jobs.push(job);  
  //        });
  // 		Res.json({
  // 			jobs:jobs
  // 		});
  	// })
  // })
});

module.exports = router;
