import { v4 } from 'node-uuid'
import faker from 'faker'

export const format = (d) => {
  const dd = d.getDate();
  const m = d.getMonth() + 1;  //months are zero based
  const y = d.getFullYear();
  return (m < 10 ? "0" + m : m) + "/" + (dd < 10 ? "0" + dd : dd) + "/" + y
}

const options = { min: 0, max: 9 }
const d  = () => faker.random.number(options)
const ssn = () => '' + d() + d() + d() + '-' + d() + d() + '-' + d() + d() + d() + d()

const pbc = () => {
  const pbc_a = ['David','Brian','Brian','Karl','Ralph','Jim', '', '']
  const n = faker.random.number(pbc_a.length-1)
  return pbc_a[n]
}

const calc_type = () => {
  const a = ['UI1','TermAB','Final','Modeling','ModelingAB']
  const n = faker.random.number(a.length-1)
  return a[n]
}

const ric = () => {
  const a = ['EXE','BANK','BANK','BANK','PREP','SUBSI']
  const n = faker.random.number(a.length-1)
  return a[n]
}

const tags = () => {
  const a = ['nrd',...[...Array(10)].map(()=>'')]
  const n = faker.random.number(a.length-1)
  return a[n]
}


const status = () => {
  const a = [...[...Array(7)].map(()=>'A'),...[...Array(3)].map(()=>'T'),'L']
  const n = faker.random.number(a.length-1)
  return a[n]
}

const tc = () => {
  const lowest =  1000;
  const highest = 100000;
  return lowest + Math.floor(Math.random() * 100).toString()
}

export const sample = () =>  {
  const dob = faker.date.between('1/1/1935','1/1/1999')
  const crd = faker.date.past(2)
  // const doe = null
  // const dot = null
  // A, T, L, D, X, ' ' - status as crd calc'd based on crd - dob, doe, dot
  //dotm (for modeling of A and L only)
  const s = status()
  const dotm_data = (['A','L'].includes(s)) ? crd + 25 : null

  //bcdf - param for final only or modeling and after dot - 'bcd' is other wise calculated

  return {
    id: v4(),
    ssn: ssn(),
    text: faker.name.findName(),
    completed: String(faker.random.boolean()),
    crd: format(crd),
    tc: tc(),
    pbc: pbc(),
    calc_type: calc_type(),
    doe: format(faker.date.between('1/1/1970','1/5/2017')),
    dob: format(dob),
    ric: ric(),
    status: s,
    tags: tags(),
    dotm: dotm_data,
    // bcdf: format(bcd),
    //agedoe() { return new Date(a.crd).getFullYear() - new Date(a.doe).getFullYear() },

  }
}

export const samples = (n = 1) => {
  const arr = []
  for(var i=0; i < n; i++){
    arr.push(sample())
  }
  return arr
}

console.log(samples);
