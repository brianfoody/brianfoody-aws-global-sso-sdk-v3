# AWS SSO SDK Wrapper

Utility library that allows for easily moving between all accounts programatically.

# AWS Client

You can create an AWS client easily. All you need to pass in is a service for local storage.

This makes it easy to use between web, mobile and your local desktop.

```
const { aws, access } = await createAWSClient();
```

# SSO Aware

The SDK is immediately aware of your SSO access by reading your ~/.aws/config file.

```
const ssoUrls = access.organisations.map(o => o.ssoStartUrl)
const ssoProviders = access.organisations.map(o => o.name)
const accounts = access.organisations.flatMap((o) => o.accounts);
```

# AWS Wrapper

The `aws` variable returned can be used to move between accounts and roles dynamically.

For example, here we can scan a Dynamo table in one account and insert into another.

```
const item = await aws.account("Account1").role("DevAccess").dynamo.getItem({
  TableName: "table-name",
  Key: {
    id: { S: "id" }
  }
})

await aws.account("Account2").role("DevAccess").dynamo.putItem({
  TableName: "table-name",
  Item: item
})
```

# S3 Helper

The SDK has been augmented to make interacting with S3 easy.

```
const buckets = await aws.s3Helper.listBuckets()

const objectsUnderFolder = await aws
  .account("Account1")
  .role("Role")
  .s3Helper
  .listObjects({
    Bucket: bucket,
    Prefix: "/folder1/folder2"
  })

const details = await await aws
  .account("Account1")
  .role("Role")
  .s3Helper.getObjectDetails({
    Bucket: bucket,
    Key: "folder1/folder2/file.txt"
  })

const download = await await aws
  .account("Account1")
  .role("Role")
  .s3Helper.download({
    Bucket: bucket,
    Key: "folder1/folder2/file.txt",
  })
```
