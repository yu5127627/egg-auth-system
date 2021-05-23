/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50733
Source Host           : localhost:3306
Source Database       : egg_auth

Target Server Type    : MYSQL
Target Server Version : 50733
File Encoding         : 65001

Date: 2021-05-24 00:39:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for log_login
-- ----------------------------
DROP TABLE IF EXISTS `log_login`;
CREATE TABLE `log_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `ip` varchar(64) NOT NULL COMMENT '登录ip',
  `address` varchar(255) NOT NULL COMMENT '位置',
  `browser` varchar(255) NOT NULL COMMENT '浏览器',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  `managerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `managerId` (`managerId`),
  CONSTRAINT `log_login_ibfk_1` FOREIGN KEY (`managerId`) REFERENCES `sys_manager` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of log_login
-- ----------------------------
INSERT INTO `log_login` VALUES ('9', 'ykn', '::1', '', 'Windows10/Chrome90.0.4430.93 ', '2021-05-22 12:15:51', '2');
INSERT INTO `log_login` VALUES ('11', 'admin', '127.0.0.1', '', 'Windows10/Firefox88.0 ', '2021-05-22 12:53:05', '25');
INSERT INTO `log_login` VALUES ('12', 'admin', '127.0.0.1', '', 'Windows10/Firefox88.0 ', '2021-05-22 12:53:17', '25');
INSERT INTO `log_login` VALUES ('13', 'ykn', '127.0.0.1', '', 'Windows10/Firefox88.0 ', '2021-05-22 12:54:27', '2');
INSERT INTO `log_login` VALUES ('14', 'ykn', '::1', '', 'Windows10/Chrome90.0.4430.93 ', '2021-05-22 12:54:32', '2');
INSERT INTO `log_login` VALUES ('15', 'ykn', '127.0.0.1', '', 'Windows10 / Firefox88.0 ', '2021-05-22 12:56:06', '2');
INSERT INTO `log_login` VALUES ('16', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.93 ', '2021-05-22 13:08:05', '2');
INSERT INTO `log_login` VALUES ('17', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 18:39:11', '2');
INSERT INTO `log_login` VALUES ('18', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 19:41:15', '2');
INSERT INTO `log_login` VALUES ('19', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 19:45:48', '2');
INSERT INTO `log_login` VALUES ('20', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 20:22:37', '2');
INSERT INTO `log_login` VALUES ('21', 'admin', '127.0.0.1', '', 'undefinedundefined / undefinedundefined ', '2021-05-23 20:24:34', '25');
INSERT INTO `log_login` VALUES ('22', 'admin', '127.0.0.1', '', 'undefinedundefined / undefinedundefined ', '2021-05-23 20:25:09', '25');
INSERT INTO `log_login` VALUES ('23', 'admin', '127.0.0.1', '', 'undefinedundefined / undefinedundefined ', '2021-05-23 20:25:16', '25');
INSERT INTO `log_login` VALUES ('24', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 21:09:39', '2');
INSERT INTO `log_login` VALUES ('25', 'admin', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 21:09:55', '25');
INSERT INTO `log_login` VALUES ('26', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 21:13:20', '2');
INSERT INTO `log_login` VALUES ('27', 'admin', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 21:13:42', '25');
INSERT INTO `log_login` VALUES ('28', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 21:16:40', '2');
INSERT INTO `log_login` VALUES ('29', 'admin', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 21:34:29', '25');
INSERT INTO `log_login` VALUES ('30', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 23:36:11', '2');
INSERT INTO `log_login` VALUES ('31', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 23:39:32', '2');
INSERT INTO `log_login` VALUES ('32', 'ykn', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-23 23:46:13', '2');
INSERT INTO `log_login` VALUES ('33', 'superAdmin', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-24 00:35:48', '2');
INSERT INTO `log_login` VALUES ('34', 'superAdmin', '::1', '', 'Windows10 / Chrome90.0.4430.212 ', '2021-05-24 00:37:16', '2');

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
  `roleId` int(11) DEFAULT NULL,
  `ctime` datetime NOT NULL COMMENT '创建时间',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `sys_manager_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `sys_role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_manager
-- ----------------------------
INSERT INTO `sys_manager` VALUES ('2', 'superAdmin', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', '余某人', '/upload/avatar.gif', '1', '0000-00-00 00:00:00', '2021-05-24 00:37:16');
INSERT INTO `sys_manager` VALUES ('3', 'test', '$2a$10$FN7emWSJCVdDXNAFof.Z5uAni63joiHL6ln7sW91iOIeBr2FjuNJy', '游客', '/upload/avatar.gif', '11', '0000-00-00 00:00:00', '2021-05-22 12:16:30');
INSERT INTO `sys_manager` VALUES ('25', 'admin', '$2a$10$EIbVRBQWwIsjw/2DrqsYyOUsJQf1yqWXT0ZOFnxb.agmgrXWS8yXa', '用户_1621348724664', '/upload/avatar.gif', '12', '0000-00-00 00:00:00', '2021-05-23 21:34:29');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '菜单类型',
  `icon` varchar(64) NOT NULL DEFAULT '' COMMENT '图标',
  `islink` tinyint(1) NOT NULL DEFAULT '0' COMMENT '外链菜单',
  `cache` tinyint(1) NOT NULL DEFAULT '0' COMMENT '缓存菜单',
  `show` tinyint(1) NOT NULL DEFAULT '1' COMMENT '菜单可见',
  `title` varchar(30) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `url` varchar(255) NOT NULL DEFAULT '/' COMMENT '菜单地址',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '组件名称',
  `sort` int(11) NOT NULL DEFAULT '999' COMMENT '排序',
  `path` varchar(255) NOT NULL DEFAULT '' COMMENT '组件路径',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父菜单',
  `rule` varchar(30) NOT NULL DEFAULT '' COMMENT '权限规则',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '0', 'system', '0', '0', '1', '系统管理', '/system', '', '100', '', '0', '');
INSERT INTO `sys_menu` VALUES ('2', '1', 'menu', '0', '0', '1', '菜单管理', 'menu', 'Menu', '3', '/system/menu', '1', '');
INSERT INTO `sys_menu` VALUES ('3', '1', 'user', '0', '0', '1', '用户管理', 'manager', 'Manager', '1', '/system/manager', '1', '');
INSERT INTO `sys_menu` VALUES ('4', '1', 'role', '0', '1', '1', '角色管理', 'role', 'Role', '2', '/system/role', '1', '');
INSERT INTO `sys_menu` VALUES ('5', '2', '', '0', '0', '1', '创建菜单', '', '', '2', '', '2', 'menu:create');
INSERT INTO `sys_menu` VALUES ('6', '2', '', '0', '0', '1', '更新菜单', '', '', '3', '', '2', 'menu:update');
INSERT INTO `sys_menu` VALUES ('7', '2', '', '0', '0', '1', '删除菜单', '', '', '4', '', '2', 'menu:delete');
INSERT INTO `sys_menu` VALUES ('8', '2', '', '0', '0', '1', '创建用户', '', '', '2', '', '3', 'manager:create');
INSERT INTO `sys_menu` VALUES ('9', '2', '', '0', '0', '1', '更新用户', '', '', '3', '', '3', 'manager:update');
INSERT INTO `sys_menu` VALUES ('10', '2', '', '0', '0', '1', '删除用户', '', '', '4', '', '3', 'manager:delete');
INSERT INTO `sys_menu` VALUES ('11', '0', 'error', '0', '0', '1', '日志管理', '/log', '', '101', '', '0', '');
INSERT INTO `sys_menu` VALUES ('13', '2', '', '0', '0', '1', '创建角色', '', '', '2', '', '4', 'role:create');
INSERT INTO `sys_menu` VALUES ('14', '2', '', '0', '0', '1', '更新角色', '', '', '3', '', '4', 'role:update');
INSERT INTO `sys_menu` VALUES ('15', '2', '', '0', '0', '1', '删除角色', '', '', '4', '', '4', 'role:delete');
INSERT INTO `sys_menu` VALUES ('16', '1', 'dept', '0', '0', '1', '登录日志', 'loginlog', 'Loginlog', '1', '/log/loginlog', '11', '');
INSERT INTO `sys_menu` VALUES ('17', '0', 'link', '1', '0', '1', 'Github', 'https://github.com/yu5127627/egg-auth-system', '', '999', '', '0', '');
INSERT INTO `sys_menu` VALUES ('20', '2', '', '0', '0', '1', '查看菜单', '', '', '1', '', '2', 'menu:list');
INSERT INTO `sys_menu` VALUES ('21', '2', '', '0', '0', '1', '查看用户', '', '', '1', '', '3', 'manager:list');
INSERT INTO `sys_menu` VALUES ('22', '2', '', '0', '0', '1', '查看角色', '', '', '1', '', '4', 'role:list');
INSERT INTO `sys_menu` VALUES ('23', '2', '', '0', '0', '1', '查看登录日志', '/', '', '1', '', '16', 'logLogin:list');
INSERT INTO `sys_menu` VALUES ('24', '2', '', '0', '0', '1', '删除登录日志', '/', '', '2', '', '16', 'logLogin:delete');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) DEFAULT '' COMMENT '角色介绍',
  `name` varchar(30) NOT NULL COMMENT '名称',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `level` int(10) NOT NULL DEFAULT '10' COMMENT '角色级别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', '超级管理员', '超级管理员', '2021-04-20 23:13:39', '2021-05-23 21:11:08', '0');
INSERT INTO `sys_role` VALUES ('11', '浏览角色', '游客', '2021-05-16 00:01:57', '2021-05-23 21:09:00', '9');
INSERT INTO `sys_role` VALUES ('12', '管理员', '管理员', '2021-05-18 22:26:55', '2021-05-18 22:27:04', '1');

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
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:46:21', '2021-05-21 19:46:23', '1', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '1', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '2', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '2', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:50:45', '2021-05-21 22:50:42', '3', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '3', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '4', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '4', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '5', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '5', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '6', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '6', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '7', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '7', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-22 00:01:27', '2021-05-22 00:01:31', '8', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '9', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '9', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '10', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '10', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '11', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-16 00:02:04', '2021-05-16 00:02:04', '11', '11');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '13', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '13', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '14', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '14', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '15', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '15', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '16', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-16 00:02:04', '2021-05-16 00:02:04', '16', '11');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '17', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-16 00:02:04', '2021-05-16 00:02:04', '17', '11');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '17', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '20', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '20', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '21', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '21', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-21 22:41:03', '2021-05-21 22:41:03', '22', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-18 22:27:11', '2021-05-18 22:27:11', '22', '12');
INSERT INTO `sys_role_menu` VALUES ('2021-05-23 23:39:05', '2021-05-23 23:39:07', '23', '1');
INSERT INTO `sys_role_menu` VALUES ('2021-05-23 23:39:14', '2021-05-23 23:39:17', '24', '1');
