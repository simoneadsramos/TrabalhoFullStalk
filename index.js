import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

let empregados = []

app.get('/', (req, res) => res.status(200).json(empregados))

app.post('/', (req, res) => {
  const {
    nome,
    funcao,
    salario
  } = req.body

  const id = (1 + empregados[empregados.length -1]?.id) || 1

  const novoFuncionario = {
    id,
    nome,
    funcao,
    salario
  }

  empregados.push(novoFuncionario)

  res.status(201).json({message: 'created'})
})

app.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  const empregado = empregados.find(empregado => empregado.id === id)

  res.status(200).json(empregado)
})

app.put('/:id', (req, res) => {
  const {
    nome,
    funcao,
    salario
  } = req.body

  const id = Number(req.params.id)

  empregados = empregados.map(empregado => {
    if (empregado.id === id) {
      return {...empregado, nome, funcao, salario}
    }

    return empregado
  })

  res.status(200).json(empregados)
})

app.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  empregados = empregados.filter(empregado => empregado.id !== id)

  res.status(200).json(empregados)
})

app.listen(process.env.PORT || 3000)