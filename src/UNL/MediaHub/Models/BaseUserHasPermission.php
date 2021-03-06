<?php

abstract class UNL_MediaHub_Models_BaseUserHasPermission extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('user_has_permission');
        $this->hasColumn('user_uid',      'string', null,    array('primary' => true, 'notnull' => true, 'autoincrement' => true));
        $this->hasColumn('permission_id', 'integer',   4,    array('unsigned' => 0, 'primary' => true, 'notnull' => true, 'autoincrement' => true));
        $this->hasColumn('feed_id',       'integer',   4,    array('unsigned' => 0, 'primary' => true, 'notnull' => true, 'autoincrement' => true));
    }

    public function setUp()
    {
        $this->hasOne('UNL_MediaHub_User',       array('local'   => 'user_uid',
                                                       'foreign' => 'uid'));
        $this->hasOne('UNL_MediaHub_Permission', array('local'   => 'permission_id',
                                                       'foreign' => 'id'));
        $this->hasOne('UNL_MediaHub_Feed',       array('local'   => 'feed_id',
                                                       'foreign' => 'id'));
        parent::setUp();
    }
}
