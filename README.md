## douban-girls-webapp

a douban-girls web client

build with React, Apollo, React-Router and Redux.

you can review my code but do not depoly this project.


```
apollo client:download-schema --endpoint="http://localhost:9009/graphql/v1" --header="Authorization: Bearer 2N/+mmviPCTUY71QOCnDYCmcWIDlGuG9wmqYF0UVNPKnDqo3h0igua3d4VcSr0YCggUv+GdxSgxfdK0nilm4ezA5P46X9tAD58Me8B39vlJRB6qi0ODFDLLtoR6N7ZaPjnXmOnY9mxtHWCwtS8nOnL/ltDpupvFlsiRy5JwxYSY4b+E2Tzq0Ns7Xdl2otOHOzm8R6N4QwMFCd3ebV0+ApSYmtkkkIug/nUxrbx9UCOAsYvDlVuBShcmC5zn8BOZEuT/1PGwzAx5uOMQOqRUm5xCnRM7NZ0ErBHy2zj9qv9VLIqfSZrx7tHXGB++Lk6mO79kzqebteKHADQuW4KcL5iQvCgEr5QVAyH9jNh4cFTFzZtckmiHucw6dXBC/UDFQQCchsAwf9aa0lG7I4FmPbOTkICI5lODmU4PlVVt5x6aw3nY7wF/vQAe+XMAU8WFr7qCuCjK/smB1rrvr0rL1SA==" src/schema/schema.json
apollo codegen:generate --target=typescript --localSchemaFile="./src/schema/schema.json" --includes="./src/schema/**/*.graphql" --useReadOnlyTypes src/schema/_g --outputFlat
```
