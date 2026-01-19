const ex = require('express');
const app = ex();
app.use(ex.json());

let t = [], id = 1;

app.post('/tasks', (req, res) => {
  const x = { id: id++, txt: req.body.txt };
  t.push(x);
  res.json(x);
});

app.get('/tasks', (req, res) => res.json(t));

app.put('/tasks/:id', (req, res) => {
  const x = t.find(y => y.id == req.params.id);
  if (!x) return res.sendStatus(404);
  x.txt = req.body.txt;
  res.json(x);
});

app.delete('/tasks/:id', (req, res) => {
  t = t.filter(y => y.id != req.params.id);
  res.sendStatus(204);
});

app.listen(3000);