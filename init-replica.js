// Initialize replica set
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]
});

print("Replica set initialized successfully!");
print("You can now use MongoDB with Prisma!"); 