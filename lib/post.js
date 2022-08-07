import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

//pcocess.cwdはカレントディレクトリを指しているらしい
const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
//fileNamesは変数、fsはモジュールで、readdirSyncで配列として特定ディレクトリ配下をかえす

export function getPostsData(){
    //const fetchData = await fetch("endpoint") //SSRの場合。fetchは外部APIに接続する。endpointは


    const fileNames = fs.readdirSync(postsDirectory);
    //allPostsDataをmap関数として定義
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/,""); //ファイル名（id）

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents =fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        //idとデータを返す title, data, thumbnailを一つひとつかえす
        return {
            id,
            ...matterResult.data,
        }
    });
    return allPostsData;

}

//getStaticPathでreturnで使うpathを取得する。pathはオブジェクトで返す必要がある
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) =>{
        return {
            params: {
                id: fileName.replace(/\.md$/,"")

            },

        };
    });
    /*
    [


    ]
    */
}

//idにもとづいてブログ投稿データを返すための関数をつくる
//idを引数としてとるのは、どのブログかを識別するためのものだから
export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark().use(html).process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return{
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}