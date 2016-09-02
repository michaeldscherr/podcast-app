<template>
    <section class="section">
        <div class="columns">
            <div class="column  is-one-third">
                <aside class="menu">
                    <p class="menu-label">
                        General
                    </p>
                    <ul class="menu-list">
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">Customers</a></li>
                    </ul>
                    <p class="menu-label">
                        Administration
                    </p>
                    <ul class="menu-list">
                        <li><a href="#">Team Settings</a></li>
                        <li>
                            <a class="is-active" href="#">Manage Your Team</a>
                            <ul>
                                <li><a href="#">Members</a></li>
                                <li><a href="#">Plugins</a></li>
                                <li><a href="#">Add a member</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Invitations</a></li>
                        <li><a href="#">Authentication</a></li>
                    </ul>
                    <p class="menu-label">
                        Transactions
                    </p>
                    <ul class="menu-list">
                        <li><a href="#">Payments</a></li>
                        <li><a href="#">Transfers</a></li>
                        <li><a href="#">Balance</a></li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <h3 class="title">
                    This American Life
                    <button class="button  is-danger">Unsubscribe</button>
                </h3>
                <div class="columns  is-multiline">
                    <template v-for="n of 5">
                        <div class="column  is-one-third">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Title of Episode {{ n + 1 }}
                                    </p>
                                    <a class="card-header-icon">
                                        <i class="fa fa-angle-down"></i>
                                    </a>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                                        <br>
                                        <small>11:09 PM - 1 Jan 2016</small>
                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <a class="card-footer-item">Save</a>
                                    <a class="card-footer-item">Play</a>
                                    <a class="card-footer-item">Delete</a>
                                </footer>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
