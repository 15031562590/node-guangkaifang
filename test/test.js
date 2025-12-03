import {xxxx} from "../src/index.js";

const xx = new xxxx("233010060352", "Gx@20001118")
const login = await xx.login()

console.log(login)

const courses = await xx.queryCourse()

console.log(courses)

const course = courses[1] // 做第几个课
const chapters = await xx.getChapters(course)
console.log("chapters",chapters)
for (let chapter of chapters) {
    await xx.doChapter(chapter)
}
