## douban-girls-webapp

a douban-girls web client

build with React, Apollo, React-Router and Redux.

you can review my code but do not depoly this project.


```
apollo client:download-schema --endpoint="http://localhost:9009/graphql/v1" --header="Authorization: Bearer kIdoubx5KYoZT3p+VtD1gTnBI/i49lSPaiZVH5bMXwuyaj78iEsnkssaFY/j38dpaBgaKAKshy4CIHATPO2Qsg7ziSPcaRVs6d5cEJBslChOf1iECzanQuWd3E/9wpuy+FS3m08pRj0ibeThdm5CWbk9snaC/9YnWS4pQIeXNvRPirzKvMPj19Zz5pXLU7/65Rkf/ILQEwkZHd5dke664dKaJosa585qnnJ4t9KBEL1db+D3IOqQP3U9XiM1S6dAPHR4DvczH+uh4bUMLx+y8XUt9cF+w6UetOuWCnkeohSiEmsrBVwOJwRKosQOdNk8G85fA5Xswui6aHUruu8MUtnqkPpiKEtgDw7z9R0q9qLWshtcWE5bRRsLhJSRBpl2KTCtld3QWR3vOWqIpML02sYTq9mC8aE76YNa3TXWGzBfZWAbKAEY1xOEvsEp/FGoqvGcwgF0jeHTKpfvuVhHDg==" src/schema/schema.json
apollo codegen:generate --target=typescript --localSchemaFile="./src/schema/schema.json" --includes="./src/schema/**/*.graphql" --useReadOnlyTypes src/schema/_g --outputFlat
```
