/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50733
Source Host           : localhost:3306
Source Database       : egg_auth

Target Server Type    : MYSQL
Target Server Version : 50733
File Encoding         : 65001

Date: 2021-04-30 00:10:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_manager
-- ----------------------------
DROP TABLE IF EXISTS `sys_manager`;
CREATE TABLE `sys_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `nickname` varchar(30) NOT NULL COMMENT '昵称',
  `avatar` varchar(255) NOT NULL COMMENT '头像',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `sys_manager_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `sys_role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_manager
-- ----------------------------
INSERT INTO `sys_manager` VALUES ('2', 'ykn', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('3', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('4', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('5', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('6', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('7', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('8', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('9', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('10', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('11', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('12', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('13', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('14', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('15', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('16', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('17', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('18', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('19', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('20', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('21', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('22', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');
INSERT INTO `sys_manager` VALUES ('23', 'ykn1', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', 'ykn', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2021-04-24 15:56:30', '2021-04-24 15:56:30', '2');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL COMMENT '路由显示的名称',
  `name` varchar(30) NOT NULL COMMENT '路由名称',
  `icon` varchar(64) NOT NULL COMMENT '图标',
  `shownav` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否显示在侧边栏',
  `keepalive` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否缓存',
  `path` varchar(255) NOT NULL COMMENT '路径',
  `router` varchar(255) NOT NULL COMMENT '组件路径',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父菜单',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '内容管理', 'CMS', 'el-icon-menu', '1', '0', 'cms', '', '0', '2021-04-28 23:04:01', '2021-04-28 23:04:03');
INSERT INTO `sys_menu` VALUES ('2', '文章列表', 'Artcile', 'el-icon-menu', '1', '0', 'article', 'cms/article.vue', '1', '2021-04-28 23:06:14', '2021-04-28 23:06:17');
INSERT INTO `sys_menu` VALUES ('3', '类别', 'Cate', 'el-icon-menu', '1', '0', 'cate', 'cms/cate.vue', '1', '2021-04-28 23:06:14', '2021-04-28 23:06:17');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) DEFAULT NULL,
  `name` varchar(30) NOT NULL COMMENT '名称',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('2', '测试账号', 'test', '2021-04-20 23:13:39', '2021-04-20 23:56:02');
INSERT INTO `sys_role` VALUES ('3', null, 'test', '2021-04-20 23:15:27', '2021-04-20 23:56:08');
INSERT INTO `sys_role` VALUES ('4', null, 'admin', '2021-04-20 23:17:15', '2021-04-20 23:17:15');
INSERT INTO `sys_role` VALUES ('5', null, 'admin', '2021-04-20 23:17:33', '2021-04-20 23:17:33');
INSERT INTO `sys_role` VALUES ('6', null, 'admin', '2021-04-20 23:35:28', '2021-04-20 23:35:28');
INSERT INTO `sys_role` VALUES ('7', null, 'admin', '2021-04-20 23:36:23', '2021-04-20 23:36:23');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `menuId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`menuId`,`roleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `sys_role_menu_ibfk_1` FOREIGN KEY (`menuId`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_role_menu_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_rule
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_rule`;
CREATE TABLE `sys_role_rule` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `ruleId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`ruleId`),
  KEY `ruleId` (`ruleId`),
  CONSTRAINT `sys_role_rule_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_role_rule_ibfk_2` FOREIGN KEY (`ruleId`) REFERENCES `sys_rule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role_rule
-- ----------------------------

-- ----------------------------
-- Table structure for sys_rule
-- ----------------------------
DROP TABLE IF EXISTS `sys_rule`;
CREATE TABLE `sys_rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(30) NOT NULL COMMENT '动作',
  `description` varchar(255) NOT NULL COMMENT '描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_rule
-- ----------------------------
INSERT INTO `sys_rule` VALUES ('1', 'menu:create', '增加菜单', '2021-04-24 23:51:04', '2021-04-24 23:51:06');
