import Sequelize, { Model } from 'sequelize';

class Enroll extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.STRING,
        plan_id: Sequelize.NUMBER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}
export default Enroll;
