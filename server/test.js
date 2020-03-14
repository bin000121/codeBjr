let mongoose = require('mongoose')
// var rank = ['普通', '专家', '主任', '副主任']
// var firstName = ['张','曹','谭', '贾', '程', '于', '庞', '荀', '魏', '戚', '康', '关', '陆', '刘', '赵', '孙', '毛', '蔡', '宋', '雷', '林', '钱', '公孙', '莫', '李', '王', '陈', '吕', '朱', '司马', '诸葛', '欧阳', '马', '宾', '吴', '谢', '林', '郭', '冯', '徐']
// var lastName = ['雪峰', '羽', '飞', '恒宇', '德达', '薇薇', '倩', '贤', '茜', '龙', '树人', '钟书', '阳', '洋洋', '公明', '胜', '孝直', '公瑾', '子恒', '本初', '奉先', '伊', '志平', '建国', '建军', '宁', '孟起', '孔明', '玄德', '翼德', '云长', '文远',
//     '公台', '建民', '文若', '文长','子健','汇盈','思聪','思桦','蓓蓓','琳','权','凯文','磊', '十元', '汉升', '忠', '仲达', '子龙', '云', '致远', '伊人', '伯言']
// var arr = new Array(66).fill(1).map((value, i) => {
//     var name1 = firstName[parseInt(Math.random() * firstName.length)]
//     var name2 = lastName[parseInt(Math.random() * lastName.length)]
//     var Rank = rank[parseInt(Math.random() * rank.length)]
//     var sex = parseInt(Math.random() * 50)
//     value = {
//         Rank,
//         name: name1 + name2,
//         age: parseInt(30 + i),
//         tel: '1560695' + (512 * (i + 1)).toString().slice(0,4),
//         description: '我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼我的医术非常牛逼',
//         address: '福建厦门市集美区富强大道光明小区土豪楼666号',
//         sex: sex > 24 ? '0' : '1',
//         idCard: '45250119971029' + (1024 * (i + 1)).toString().slice(0,4),
//
//     }
//     return value
// })

// var docs=["5e6b1d503d20fce3cfce8a51", "5e6b1d503d20fce3cfce8a50", "5e6b1d503d20fce3cfce8a4f", "5e6b1d503d20fce3cfce8a4e", "5e6b1d503d20fce3cfce8a4d", "5e6b1d503d20fce3cfce8a4c", "5e6b1d503d20fce3cfce8a4b", "5e6b1d503d20fce3cfce8a4a", "5e6b1d503d20fce3cfce8a49", "5e6b1d503d20fce3cfce8a48", "5e6b1d503d20fce3cfce8a47", "5e6b1d503d20fce3cfce8a46", "5e6b1d503d20fce3cfce8a45", "5e6b1d503d20fce3cfce8a44", "5e6b1d503d20fce3cfce8a43", "5e6b1d503d20fce3cfce8a42", "5e6b1d503d20fce3cfce8a41", "5e6b1d503d20fce3cfce8a40", "5e6b1d503d20fce3cfce8a3f", "5e6b1d503d20fce3cfce8a3e", "5e6b1d503d20fce3cfce8a3d", "5e6b1d503d20fce3cfce8a3c", "5e6b1d503d20fce3cfce8a3b", "5e6b1d503d20fce3cfce8a3a", "5e6b1d503d20fce3cfce8a39", "5e6b1d503d20fce3cfce8a38", "5e6b1d503d20fce3cfce8a37", "5e6b1d503d20fce3cfce8a36", "5e6b1d503d20fce3cfce8a35", "5e6b1d503d20fce3cfce8a34", "5e6b1d503d20fce3cfce8a33", "5e6b1d503d20fce3cfce8a32", "5e6b1d503d20fce3cfce8a31", "5e6b1d503d20fce3cfce8a30", "5e6b1d503d20fce3cfce8a2f", "5e6b1d503d20fce3cfce8a2e", "5e6b1d503d20fce3cfce8a2d", "5e6b1d503d20fce3cfce8a2c", "5e6b1d503d20fce3cfce8a2b", "5e6b1d503d20fce3cfce8a2a", "5e6b1d503d20fce3cfce8a29", "5e6b1d503d20fce3cfce8a28", "5e6b1d503d20fce3cfce8a27", "5e6b1d503d20fce3cfce8a26", "5e6b1d503d20fce3cfce8a25", "5e6b1d503d20fce3cfce8a24", "5e6b1d503d20fce3cfce8a23", "5e6b1d503d20fce3cfce8a22", "5e6b1d503d20fce3cfce8a21", "5e6b1d503d20fce3cfce8a20", "5e6b1d503d20fce3cfce8a1f", "5e6b1d503d20fce3cfce8a1e", "5e6b1d503d20fce3cfce8a1d", "5e6b1d503d20fce3cfce8a1c", "5e6b1d503d20fce3cfce8a1b", "5e6b1d503d20fce3cfce8a1a", "5e6b1d503d20fce3cfce8a19", "5e6b1d503d20fce3cfce8a18", "5e6b1d503d20fce3cfce8a17", "5e6b1d503d20fce3cfce8a16", "5e6b1d503d20fce3cfce8a15", "5e6b1d503d20fce3cfce8a14", "5e6b1d503d20fce3cfce8a13", "5e6b1d503d20fce3cfce8a12", "5e6b1d503d20fce3cfce8a11", "5e6b1d503d20fce3cfce8a10"]
// var str='肾科、胃肠外科、血管外科、放射科、理疗科、老年科、乳腺外科、疼痛门诊、针灸科、推拿室、核医学科、康复科、眼科、耳鼻喉科、口腔科、皮肤科、中医科、呼吸内科、消化内科、泌尿内科、心血管科、血液科、内分泌科、神经内科、儿科、感染科、骨科、神经外科、肝胆外科、泌尿外科、烧伤科、妇科、产科'
// var arr =Array.from(new Set(str.split('、'))).map(value=>{
//     let obj={
//         roomName:value,
//         doctors:docs.splice(0,2)
//     }
//     return obj
// })

// var arr = new Array(33).fill(1).map((value,i) => {
//     var name1 = firstName[parseInt(Math.random() * firstName.length)]
//     var name2 = lastName[parseInt(Math.random() * lastName.length)]
//     var sex = parseInt(Math.random() * 10)
//
//     value = {
//         nation: '汉族',
//         name: name1 + name2,
//         age: 30+i ,
//         sex: sex > 4 ? '0' : '1',
//         tel: '1560695' + ((1024 + i) * (i + 1)).toString().slice(0, 4),
//         idCard: '45250119971029' + ((1024 + i) * (i + 1)).toString().slice(0, 4),
//
//     }
//     return value
// })

// var arr1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
// let add = new Array(22).fill(1).map((value, i) => {
//     var username = arr1[parseInt(Math.random() * arr1.length)]
//     var p = arr1[parseInt(Math.random() * arr1.length)]
//
//     let obj={
//         username:username+((i+1)*10086*1997).toString().slice(0, 5),
//         password:p+((i+1)*10086*1997*1029).toString().slice(0, 8),
//     }
//     return obj
// })

console.log(arr)
