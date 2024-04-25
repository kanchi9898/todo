"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

export default function Home() {
  const [todo, setTodo] = useState<string | undefined>()
  const [todolist, setTodolist] = useState<string[]>([])
  const [update, setUpdate] = useState(false)
  const [updateid, setUpdateid] = useState(0)

  useEffect(() => {
    const storagedata = localStorage.getItem("todo")
    if (storagedata) {
      setTodolist(JSON.parse(storagedata))
    }
  }, [])

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todo) {
      const storage = localStorage.getItem("todo")
      if (storage) {
        const old_data = JSON.parse(storage)
        const new_data = [...old_data, todo]
        localStorage.setItem("todo", JSON.stringify(new_data))
        setTodolist(new_data)
        setTodo("")
      } else {
        localStorage.setItem("todo", JSON.stringify([todo]))
        setTodolist([todo])
        setTodo("")
      }
    }
  }

  const handleDelete = (id: number) => {
    const storagedata = localStorage.getItem("todo")
    if (storagedata) {
      const list = JSON.parse(storagedata)
      const newdata = list.filter((item: string, index: number) => index !== id)
      localStorage.setItem("todo", JSON.stringify(newdata))
      setTodolist(newdata)

    }
  }

  const chooseEditfile = (id: number) => {
    const storagedata = localStorage.getItem("todo")
    setUpdate(true)
    setUpdateid(id)
    if (storagedata) {
      const list = JSON.parse(storagedata)
      const currdata = list.find((item: string, index: number) => index === id)
      setTodo(currdata)
    }
  }

  const handleupdatefile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const storagedata = localStorage.getItem("todo")
    if (storagedata && todo) {
      const list = JSON.parse(storagedata)
      list[updateid] = todo
      localStorage.setItem("todo", JSON.stringify(list))
      setTodo("")
      setUpdate(false)
      setTodolist(list)
    }
  }

  return (
    <main className="border-2 flex flex-col h-[100vh] px-10">
      <h1 className="my-5 text-[5vw]">To Do Task</h1>
      <form onSubmit={update ? handleupdatefile : handlesubmit} className="relative top-5 flex gap-[1vw]">
        <input value={todo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)} type="text" placeholder="To do Task" className="p-2 rounded border-[2px]" />
        <Button className="bg-green-500">Add Task</Button>
      </form>
      <div className="mt-10 w-full lg:w-[50%]">
        <ul className="flex gap-3 flex-col">
          {
            todolist?.map((item: string, index: number) => {
              return (
                <li key={index} className="flex items-center justify-between">
                  <section className="flex gap-2">
                    <span>{index + 1}.</span>
                    <p>{item}</p>

                  </section>
                  <section className="flex gap-3">
                    <Button className="p-1 px-5 rounded bg-green-500" onClick={() => chooseEditfile(index)}>Edit</Button>
                    <Button className="p-1 px-5 rounded bg-red-500" onClick={() => handleDelete(index)}>Delete</Button>
                  </section>
                </li>
              )
            })
          }
        </ul>
      </div>
    </main>
  )
}
