export default function User(bookshelf) {
  return bookshelf.Model.extend(
    {
      tableName: 'user',
      hasTimestamps: true,
      hidden: 'password'
    },
    {
      byEmail(email) {
        return this.forge().query({ where: { email } }).fetch();
      }
    }
  );
}
