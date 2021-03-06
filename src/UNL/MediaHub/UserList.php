<?php

class UNL_MediaHub_UserList extends UNL_MediaHub_List
{
    public $tables = 'UNL_MediaHub_User u';

    public $options = array('orderby'=>'uid', 'order'=>'ASC', 'page'=>0, 'limit'=>null);

    function setOrderBy(Doctrine_Query &$query)
    {
        $query->orderby('u.'.$this->options['orderby'].' '.$this->options['order']);
    }
}
