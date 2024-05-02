import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {

    const response = {
        "date": "2024-03-30",
        "questions": [
          {
            "question_id":"q1",
            "title": "Django와 MongoDB 연동 방법은?",
            "author_nickname": "developer123",
            "created_at": "2024-03-30T10:00:00Z",
            "upvotes": 5,
            "answers": [
              {
                "answer_id": "a1",
                "author_nickname": "expert456",
                "created_at": "2024-03-30T11:00:00Z",
                "content": "뭐라뭐라 솰라솰라",
                "upvotes": 10
              },
              {
                "answer_id": "a2",
                "author_nickname": "newbie789",
                "created_at": "2024-03-30T12:00:00Z",
                "content": "뭐라뭐라 솰라솰라",
                "upvotes": 3
              }
            ]
          }
        ]
      }

      return NextResponse.json(response, {status:200});
    
}