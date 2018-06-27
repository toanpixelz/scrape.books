/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('book', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name'
		},
		price: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'phone'
		},
		availability: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'availability'
		},
		srcImage: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'srcImage'
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'rating'
		},
		
		createdDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'created_date',
			defaultValue: new Date()
        },
        source:{
            type: DataTypes.STRING(255),
			allowNull: true,
			field: 'source'
        },
        page:{
            type: DataTypes.INTEGER,
			allowNull: true,
			field: 'page'
        }
	}, {
			tableName: 'book',
			
		});
};
