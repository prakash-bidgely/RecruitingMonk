var axios = require("axios");
var datas = require('./comments_meta.json');

axios.get("http://localhost:3000/allq/").then(res => {
    var data = res.data;
    data.map(d => {
        var uid = d.uid;
        var post = JSON.parse(datas).filter(dq => dq.ID == uid);
        console.log(post)
        if(post[0]) {
            // var category = post[0].category.split ( ">" );
            // var tags = post[0].tags.split ( "|" );
            // d.tags = tags;
            // d.category = category;
            // axios.post("http://localhost:3000/replace", d).then(r => console.log("Success"))
            //     .catch(err => console.log(err))
            //console.log(post[0])
        }
    })
}).catch(err => console.log(err));