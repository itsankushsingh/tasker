const canAccessTask = (user,task) => {
  return (
    user.role === "admin" ||
    task.assignedTo.toString() === user._id.toString()
  );
};

export { canAccessTask }