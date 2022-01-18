## douban-girls-webapp

a douban-girls web client

build with React, Apollo, React-Router and Redux.

you can review my code but do not depoly this project.


```
apollo client:download-schema --endpoint="http://localhost:9009/graphql/v1" --header="Authorization: Bearer vA9Cf4ubJL0U+wiYqzlThqv0b6weO1HeWYx0ReYLWR9vjBTfHihe81xdslelCxBiWtBhN6pw4WRUcGXq299GfytjJ7CbaVrNxr8MW8pdxAR6nmKypv6uW1itLlaMuN3/XnIZ1jSSeUH7Ag4NWDnXmc94iU4fCeqDmYY0zzm5F9MG07fnxW8HTPJ0d+VQxhuXfRqjeN+ZzspL10+73VN/f05g1RZ4BsheQVpnEmbcuRe4FvB8uNWar0RjRllH3Y+RDCFg3JlKcjjExDgudYSO/Q6rMqWkIstBA12TEpq7lDuTT3ttoCvjzT1/6kzOCpuNFthuGX2rRFfqtU0U08yCqRuJ4ylXFIyFRnMw3yFFeahhxlT3QgVs1k35S8PjezuaNiKM5ZpsgKoKsPxbJedmyE9unuFFFtOk220cJW3E+u972ESX/pqBx5I7NOip+8fpiWCh53cYWjKmlmQyqGAV/g==" src/schema/schema.json
apollo codegen:generate --target=typescript --localSchemaFile="./src/schema/schema.json" --includes="./src/schema/**/*.graphql" --useReadOnlyTypes src/schema/_g --outputFlat
```
