import {DataTypes, Model, Sequelize} from 'sequelize';
import Decimal from 'decimal.js';

/**
 * A profile linking an applicant with the competence they have, and they years of experience with that competence.
 * */
class CompetenceProfile extends Model {
  declare id: number;
  declare personId: number;
  declare competenceId: number;
  declare yearsOfExperience: Decimal;

  /**
   * Creates a competence profile model.
   * @param sequelize The Sequelize object.
   * @return A Sequelize model representing a competence profile.
   * */
  static createModel(sequelize: Sequelize) {
    CompetenceProfile.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'competence_profile_id',
        },
        personId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'person_id',
          references: {
            model: 'user',
            key: 'person_id',
          },
        },
        competenceId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'competence_id',
          references: {
            model: 'competence',
            key: 'competence_id',
          },
        },
        yearsOfExperience: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: false,
          field: 'years_of_experience',
        },
      },
      {
        sequelize,
        modelName: 'competenceProfile',
        tableName: 'competence_profile',
        timestamps: false,
      }
    );
    return CompetenceProfile;
  }
}

export {CompetenceProfile};
