'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spaces', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: Sequelize.STRING,
      date: Sequelize.INTEGER,
      district: Sequelize.STRING,
      block: Sequelize.STRING,
      space: Sequelize.STRING,
      eventId: {
        type: Sequelize.UUID,
        references: {
          model: 'events',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() =>
      queryInterface.addIndex(
        'spaces',
        ['date', 'block', 'space', 'eventId'],
        { indicesType: 'UNIQUE' }
      )
    )
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('spaces')
  }
}
