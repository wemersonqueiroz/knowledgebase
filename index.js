import { Client } from "@notionhq/client"
import express from "express"
import bodyParser from "body-parser"
import request from "request"
import https from "https"

const Test = Test => console.log(Test)

const app = express()
const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

// addItem("Im Working")

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})
