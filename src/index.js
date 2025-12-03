import {Requests} from "http-core";

export class xxxx extends Requests {
    _init_() {
        this.instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
        this.instance.interceptors.request.use(async config => {
            //修改请求
            return config
        })

        this.instance.interceptors.response.use(async (response) => {
            return response
        }, async (error) => {
            return Promise.reject(error)
        })
    }


    //登录 返回的对象比如包含{status,msg,name}  status:true/false msg:登录信息 name(可选):用户名字
    async login() {
        const res = await this.instance.post("https://open.gxou.com.cn/api/login", {
            password: this.password,
            "remember-me": false,
            sessionId: "",
            username: this.username
        })
        console.log("res", res.data)
        this.token = res.data.result.token
        const info = await this.instance.get("https://open.gxou.com.cn/api/user/current", {})
        if (info.data.ok) {
            this.id = info.data.result.id
            return {
                status: true,
                msg: "登录成功",
                name: info.data.result.name
            }
        }
        return {
            msg: '密码错误'
        }
    }

    //查课 返回的对象中必须包含 id和name {id:1,name:"课程名称"}
    async queryCourse() {
        const res = await this.instance.get("https://open.gxou.com.cn/api/user/findCourses?type=current")
        console.log("kecheng",res.data)
        if (res.data.ok && Array.isArray(res.data.result.learningCourses)){
            return res.data.result.learningCourses
        }
    }

    // 返回的列表的对象必须有一个是否跳过的标识，也就是 pass {pass:true}
    async getChapters(course) {
        const  res = await this.instance.get(`https://courses.gxou.com.cn/my/course/${course.id}`)
        console.log("chapter",res.data)
    }

    // 要根据不同的章节类型去做不同的事情
    async doChapter(chapter) {

    }

    // 根据课程信息找到所有的作业列表
    async getHomeWorks(course) {

    }

    async getQuestionList(homework) {
        //1. 打开考试

        //2. 获取问题详情

        //3. 返回这个所有的问题列表[{qid:xxx,question:xxx,type:xxx,plat:xxx,}]
    }

    async doHomeWorkQuestion(question) {
        //1. 搜题 Worker.search

        //2. 填充答案

        //3. 保存答案
    }

    async submitHomeWork(homework) {

    }

}
